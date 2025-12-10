---
title: 'Making a pinball game for Playdate: Part 12, the bug hunt'
tags: playdate,devils-on-the-moon,programming,springs,pinball
excerpt: ''
publish: false
date: 2025/12/08
cover:
  url: https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-12-the-bug-hunt/device-info.png
authors:
  - name: Mario
    url: 'https://merveilles.town/@mario_afk'
    mastodon: '@mario_afk@merveilles.town'
mastodon:
  host: merveilles.town
  username: mario_afk
  postId: ''
---

Welcome to this adventure, where I write about the process of our latest game, [Devils on the Moon pinball](https://play.date/games/devils-on-the-moon-pinball/).

This is a story on how we lost almost two full weeks of work while chasing a crash that only happened on the Playdate device randomly after some time of playing.

It all started with a normal build to device that started crashing, the weird part was that the game only crashed when putting the device to sleep.

I went to that part of the code and found nothing, literally nothing, I wasn't doing anything at all during that callback. Ok, don't panic, lets see what the `crashlog.txt` says. If you don't know what this file is, consider you lucky. But it's where the Playdate logs hard crashes information and it looks like this.

```bash
--- crash at 2025/12/10 20:35:08---
build:e44193e8-3.0.1-release.194549-gitlab-runner
 r0:00008001    r1:20009b90     r2:38800088    r3: 00000000
r12:2000f8d1    lr:24021457     pc:24021456   psr: 410f0000
cfsr:00010000  hfsr:40000000  mmfar:00000000  bfar: 00000000
rcccsr:00000000
heap allocated: 15233952
Lua totalbytes=0 GCdebt=0 GCestimate=0 stacksize=0
```

First time I looked at this I just closed the file and started putting `printf`'s everywhere. But this time I knew that wasn't going to work. So understanding the crash report it is.

# Memory suspects

One thing that may help right out of the bat is the heap allocated field, this might be relevant specially for LUA based projects as if it's a high number it probably means you have a memory leak and the device ran out of memory.

## Out of memory

Well here we have `15232096` well firs that number represents the amount of memory your game as allocated in bytes. if we convert it to megabytes we have `15.2MB`. Well the Playdate has `16MB` of ram so that would be a pretty close call, in our case though what I'm doing is reserving as much memory as possible ar the beginning of the game (`15.2MB`) and then using that memory though my own custom memory allocator. [A simple](https://nullprogram.com/blog/2023/09/27/) [memory](https://www.rfleury.com/p/enter-the-arena-talk) [arena](https://www.gingerbill.org/article/2019/02/08/memory-allocation-strategies-002/). So I knew this was the cause of the crash here. If you are having memory leaks though a really useful tool is the device info window in the Playdate SDK.

![Device Info](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-12-the-bug-hunt/device-info.png)

As you can see here the memory stays the same the whole time. Once you are using your own memory allocator you can do a lot of cool stuff like setting a custom limit and letting you know on a simulator build if you are getting past it. You can also use the `malloc pool` feature on the simulator and limit to `16MB` memory your game has available.

## Memory initialization

So it wasn't a memory leak. Another thing that may cause something to crash on device and not in simulator is that if you are using a low level language like C the memory can have trash values when you get it causing a bunch of issues if you are not careful initializing things.

It happen to me a bunch of times that on the simulator build of the game all the memory I got from the OS was zeroed out, but when I tried it on device it would crash because some trash value I assumed would be 0. I'm not sure but I think the memory you get it's actually just the memory from the previous process that was running and if you just relaunched your game from a crash a lot of times this is your own game. So what would happen to me is that the game would crash when starting from the launcher but wouldn't when starting using the `pdc` tool.

To fix this there is a couple of things you can do. One is to make sure to clear out any memory that you get from the OS. This way at least you know that you are starting at the same state as in your desktop computer. For this there is a simple yet useful couple of macros I like.

```c
#define mclr(dst, size)      memset((dst), (0), (size))
#define mclr_struct(s)       mclr((s), sizeof(*(s)))
#define mclr_array(a)        mclr((a), sizeof(a))
```

This is useful by itself but combined with other macros you can make sure to always have cleared memory.

```c
#define alloc_struct(alloc, ptr)     (__typeof__(ptr))alloc_size(alloc, sizeof(*(ptr)), false)
#define alloc_struct_clr(alloc, ptr) (__typeof__(ptr))alloc_size(alloc, sizeof(*(ptr)), true)

void *
alloc_size(struct alloc alloc, ssize mem_size, b32 clr)
{
	void *mem = alloc.allocf(alloc.ctx, mem_size);
	if(clr) { mclr(mem, mem_size); };
	return mem;
}
...
struct game *game = alloc_struct_clr(alloc, game);
```

The problem is that clearing memory is fast but is not free, it takes some cycles to do it so you don't want to do it everywhere. Well another thing you can do is to poison your memory on the simulator.

```c
#define MEM_POISON_PATTERN 0xCD
#if defined(DEBUG)
memset(mem->buffer, MEM_POISON_PATTERN, mem->size);
#endif
```

I think this is done by default on Visual Studio on debug builds.

This way it you would loose performance on your debug build but that's preferable to loose it on the release version. This pattern has helped me tremendously and removed one common cause of bugs in my code.

So I was sure it wasn't a memory uninitialized problem this time around.

## Mem fault

Back to trying to understand the crashlog.txt

```bash
--- crash at 2025/12/10 20:35:08---
build:e44193e8-3.0.1-release.194549-gitlab-runner
 r0:00008001    r1:20009b90     r2:38800088    r3: 00000000
r12:2000f8d1    lr:24021457     pc:24021456   psr: 410f0000
cfsr:00010000  hfsr:40000000  mmfar:00000000  bfar: 00000000
rcccsr:00000000
heap allocated: 15233952
Lua totalbytes=0 GCdebt=0 GCestimate=0 stacksize=0
```

Thankfully there is a really good albeit technical documentation about this [How to debug a HardFault on an ARM Cortex-M MCU](https://interrupt.memfault.com/blog/cortex-m-hardfault-debug#how-to-debug-a-hardfault-on-an-arm-cortex-m-mcu)

First thing I noticed is that the `cfsr` has a value set because it's not all zeros. So how it works is that the `cfsr` or Configurable Fault Status Registers stores information about the crash turning on bits in a _32 bit_ register.

The numbers in the `crashlog.txt` are 32 bit hexadecimal numbers so to know what register was turned on we have to convert it to binary our value here of `00010000` converts to:

`0000 0000 0000 0001 0000 0000 0000 0000`

![CFSR](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-12-the-bug-hunt/cfsr.png)
Thanks to this image we know that the first 8 bits correspond to the `UFSR` as they are the only bits with a value let's focus on that.

`UFSR` stands for Usage Fault Status Register so we know the crash was not caused by something related to memory access.

Now thanks to this image we know that the second bit means there was a `UNDEFINSTR`

`0000 0000 0000 0001`
![UFSR](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-12-the-bug-hunt/ufsr.png)

From the article this means that an undefined instruction was executed, this can happen if the stack got corrupted.

One thing that sometimes is usefull is to search for **FreeRTOS** resources [like this one](https://www.freertos.org/Debugging-Hard-Faults-On-Cortex-M-Microcontrollers.html), as this is the operating system the Playdate is using.

```bash
λ › python ./firmware_symbolizer.py ./crashlog.txt ./build/playdate/pdex.elf                                                 games/devils-on-the-moon-pinball HEAD
--- crash at 2025/12/10 20:35:08---
build:e44193e8-3.0.1-release.194549-gitlab-runner
   r0:00008001    r1:20009b90     r2:38800088    r3: 00000000
  r12:2000f8d1    lr:24021457     pc:24021456   psr: 410f0000
 cfsr:00010000  hfsr:40000000  mmfar:00000000  bfar: 00000000
rcccsr:00000000
heap allocated: 15233952
Lua totalbytes=0 GCdebt=0 GCestimate=0 stacksize=0

lr: 0x24021457 -> 67245143
arm-none-eabi-addr2line -f -i -p -e ./build/playdate/pdex.elf 0x4021456 0x4021457
?? ??:0
?? ??:0
```
