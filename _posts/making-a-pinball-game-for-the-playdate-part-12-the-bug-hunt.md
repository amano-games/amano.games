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

# Low hanging fruit

The first step to understand the crash is to run the `firmware_symbolizer.py` script provided on the SDK. This tool tries to tell you where the crash happen.

```bash
python $(PLAYDATE_SDK)/bin/firmware_symbolizer.py ./crashlog.txt build/playdate/pdex.elf

?? ??:0
?? ??:0
```

Well that is not helpful, but this will happen a lot of times, the really bad crashes tend to crash so bad that the **symbolizer** is unable to tell where the crash happened.

There are some things that have helped me though. One is that I use a modified version of the simbolizer that prints the actual command used to get the line of code.

```python
import re
import subprocess
import click


@click.command()
@click.argument("crashlog", type=click.Path(exists=True))
@click.argument("elf", type=click.Path(exists=True))
def symbolize(crashlog, elf):
    cl_contents = open(crashlog, "r").read()

    cl_blocks = re.split(r"\n\n", cl_contents)

    for block in cl_blocks:
        matches = re.search(r"lr:([0-9a-f]{8})\s+pc:([0-9a-f]{8})", block)

        if matches:
            print(block, "\n")

            lr = matches.group(1)
            pc = matches.group(2)

            lr_num = int(lr, 16)
            pc_num = int(pc, 16)

            lr_num = lr_num & 0x0FFFFFFF
            pc_num = pc_num & 0x0FFFFFFF

            print("lr: {} -> {}".format(hex(int(lr, 16)), lr_num))

            lr = hex(lr_num)
            pc = hex(pc_num)

            cmd = f"arm-none-eabi-addr2line -f -i -p -e {elf} {pc} {lr}"
            print(cmd)
            stack = subprocess.check_output(cmd, shell=True).decode("ASCII")
            print(stack)


if __name__ == "__main__":
    symbolize()
```

What the simbolyzer is doing, is calling the command `arm-none-eabi-addr2line` and passing the address that caused the crash. Your code lives in RAM memory same as your runtime allocations, and it's stored in a memory address, the `PC` and `LR` registers store the memory address where the function that caused the crash is stored. The only problem is that the address is not mapped one to one to your `elf` file because the playdate stores it on a different offset depending if it's a `Rev A` or `Rev B` Playdate. So the symbolizer also converts the memory you get from the `crashlog.txt` to the correct one on the `elf file`

```bash
lr: 0x24021457 -> 67245143
arm-none-eabi-addr2line -f -i -p -e ./build/playdate/pdex.elf 0x4021456 0x4021457
?? ??:0
?? ??:0
```

Still not really helpful. I have found that the really nasty bugs tend to crash on a random function that that it's not on a helpful region of memory this can be because the function is a Playdate function and we don't have the map for that, or the address is completely wrong. There are some people at the Playdate Discord that can tell what kind of function made the crash just by looking at the address (shout out to scratchminer) but every time I see the `?? ??:0` I know I'm in trouble.

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
#define mclr(dst, size) memset((dst), (0), (size))
#define mclr_struct(s)  mclr((s), sizeof(*(s)))
#define mclr_array(a)   mclr((a), sizeof(a))
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
Thanks to this image we know that the last 16 bits correspond to the `UFSR` as they are the only bits with a value let's focus on that.

`UFSR` stands for Usage Fault Status Register so we know the crash was not caused by something related to memory access.

Now thanks to this image we know that the second bit means there was a `UNDEFINSTR`

`0000 0000 0000 0001`
![UFSR](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-12-the-bug-hunt/ufsr.png)

From the article this means that an undefined instruction was executed, this can happen if the stack got corrupted.

# Reproduce

At this point I will be honest with you, I wasn't thinking completely straight, and became paranoid. The fact that the game would only crash after some random time and then locking the screen made no sense to me.

Thankfully Jp is the best Q.A. tester I have ever met and was able to find that the issue only happened after interacting with a specific entity in the game, we call him the _Nalgón_ which translates to _Big butt guy_ in English.

He is one of our favorite characters from the game and before it was showing his butt and mocking you.

![Nalgón](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-06-the-profiler/nalgon.gif)

Even though we removed the version of him where it showed it's butt. I started to feel like it was mocking me.

Now that we had an easy way to reproduce the bug, go to the `Nalgón` bump it with the ball and lock the screen, I started commenting code and see if the crash keep happening. The process was painful:

1. Build the game
2. Launch the simulator
3. Press `CTRL+U` to send the game to the device
4. Wait for 3-5 minutes while the game get's copied
5. Enable the developer cursor
6. Bump the `Nalgón`

All in all it took around 10 minutes to test each build which quickly helped with my paronia.

I wrote a small script to automate most of the tasks. I had built something similar years ago when working with Pullfrog when the Linux simulator didn't have the **Send to device** command.

```bash
#!/bin/bash
set -euo pipefail

DESTDIR="build/"
GAME_NAME="devils-on-the-moon-pinball-dev"
PD_DEV="/dev/ttyACM0"
PD_MOUNT="/your/mount/folder"
SRC_DIR="${DESTDIR}playdate/${GAME_NAME}.pdx"
DST_DIR="${PD_MOUNT}/Games/${GAME_NAME}.pdx"


if [[ -e "$PD_DEV" ]]; then
  if [[ ! -d "$PD_MOUNT" ]]; then
    if ! pdutil "$PD_DEV" datadisk; then
      echo "Failed to enter Data Disk Mode." >&2
      exit 1
    fi

    for i in {1..20}; do
      if [[ -d "$PD_MOUNT" ]]; then
        break
      fi
      sleep 0.5
    done
  fi
elif [[ -d "$PD_MOUNT" ]]; then

else
  echo "Playdate not connected." >&2
  exit 1
fi

if [[ ! -d "$PD_MOUNT" ]]; then
  echo "Playdate mount did not appear." >&2
  exit 1
fi

rsync -azrt --update --modify-window=1 --prune-empty-dirs --delete \
  --info=name0 --info=progress2 \
  "${SRC_DIR}/" "${DST_DIR}/"

udiskie-umount --eject /dev/sde1
sleep 2.0
pdutil "$PD_DEV" run "Games/${GAME_NAME}.pdx";
```

This reduce the effort of testing the build on device by a lot. It only works on Linux and you will need to change variables to make it work in your setup. If you want a similar script for Mac, [Nino](https://ninovanhooff.itch.io/) [has this great script](https://github.com/ninovanhooff/wheelsprung/blob/main/scripts/quickinstall.sh).

One thing that sometimes is usefull is to search for **FreeRTOS** resources [like this one](https://www.freertos.org/Debugging-Hard-Faults-On-Cortex-M-Microcontrollers.html), as this is the operating system the Playdate is using.
