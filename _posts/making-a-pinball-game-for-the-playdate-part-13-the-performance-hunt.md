---
s3_path: devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-hunt
title: 'Making a pinball game for Playdate: Part 13, the performance hunt'
tags:
  - pinball
  - devils-on-the-moon-pinball
  - playdate
  - programming
  - profiler
  - performance
excerpt: How to optimize a game for the playdate?
publish: false
date: 2026/09/21
cover:
  url: https://media.amano.games/spall.png
authors:
  - name: Mario
    url: https://merveilles.town/@mario_afk
    mastodon: '@mario_afk@merveilles.town'
mastodon:
  host: merveilles.town
  username: mario_afk
  postId: ''
---

If you have developed a game on the Playdate you might have got to the point where you start having performance issues.

This also tends to happen at the worst possible time, when you are trying to finish your game and adding all the content that you had planned. And if you have been doing this game for I don't know [two years](https://amano.games/devlog/making-a-pinball-game-for-the-playdate-part-01-the-language) It will be really hard to figure out what to optimize.

This has happened to us before with [Pullfrog Deluxe](https://play.date/games/pullfrog/) we where adding the last couple of ideas we had for special blocks, and with the last one it was a little too much for the Playdate.

It's easy to happen to you even if you have experience doing games elsewhere like mobile or PC. Hardware now a days is so fast that you can almost always do the naive thing with your small indie 2D game. Well the Playdate even though it's CPU is not slow. Is not infinite power fast. And I think it's one of the most common issues that happen when you start developing games for it.

# The sampler

There are a couple of tools you can use. You can use the sampler which tells you how many times a function has ran. It is common that you missed something and a function is running way more times than what you thought it was going to.

For us for example we saw that the `mem_set` function was running way more times than what I expected.

![sampler.png](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-hunt/sampler.png)

Our physics system runs 4 times on every frame. One thing you need to do in a physics system is to collect colliding pairs. You do your broad collision detection and mark which entities are colliding with who. One thing you want to avoid is checking the same pair multiple times so you need some bookkeeping that is cheaper than your broad collision detection. One way of doing it is using a bit flags. You can read a more in depth explanation on Real time collision detection on the section _Avoid retesting_.

How it works is you generate a bit array that can hold a bit per entity pair, so when you get a pair of entities you want to check first you check if their pair bit is set, and if it is you can skip doing the full test, if not you do the full test and then set the bit.

Simple and effective. Well as the game grew and we created more entities we ended up with around 450, this means that our bit array needed to be `450 * 449 / 2 = 101025 bits` create and clear this array every frame and we are clearing ~56KiB of memory every frame. I skipped the last part on that books chapter but the warning was there!

> _Even for a modest number of objects, this operation now quickly becomes very expensive._

There are other options to do this like keeping a timestamp on each body and each time we do a query making sure the timestamp equals the query timestamp but after thinking about it for a bit, in our game we only have colliding pairs between balls and bodies and we have a single ball. Sure I would like to be able to add multi ball to our game or any other table but then again it would be 3 balls at most, so I decided to just keep a small linear array and scan it every time we need to check if those pairs are already present.

No more memory clearing and we gain a fair bit of perfomance there.

The problem is we know the game runs faster, we have a simple FPS counter and you can see the graph on the resource view of the Playdate SDK but it's hard to measure how fast. Or even worse if somehow something else became slower because of your change.

![device-info.png](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-hunt/device-info.png)

# The profiler

To mesure this one tool you can use is a profiler. The problem is that there is no builtin profiler for the Playdate. And any of the existing solutions tend to be too big for it.

There are also nuance differences on profilers that I didn't realized before stating this project. What I have always used before this in other projects is what is called a Sampling profiler, an automated tool that mesures the code that you already have by interrupting the process and measuring automatically how long each part of your code took. Another type is instrumentation profiling where you manually add zones to your code to mesure specific areas you are interested in.

Each of them has it's own pros and cons. For example the biggest and most obvious pro for the sampling profiler is that you don't really need to do much to gain a lot of information about your game code. You just run your game, play for a bit, and then go to the profiler and analyze the data that it captured. But this was really hard on the Playdate even if wanted to code my own, you don'have the permissions you would need to modify how a process runs on the playdate. So a sampling profiler would only be possible my desktop computer using the simulator, but that will be almost useless as the Playdate limitations are really hard to emulate on desktop.

The instrumentation profiler seems more feasible because I can manually edit my code and add the zones to where I thought the game was being slow.

There are a couple of profilers I knew about and wanted to try. Even if I only managed to profile on desktop to start, the cost of doing it is so low even if it gives my any small insight it will be worth it.

First I started reading the docs for the Tracy profiler but quickly realized that to be able to use the instrumentation API I needed to compile the project using C++, and I didn't want to get in to that rat hole.

I found the wonderful [Spall](https://gravitymoth.com/spall/spall-web.html) profiler which had a single header implementation with a simple API that I could provide my own memory and functions for reading and writing files.

This looked promising!

![spall.png](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-hunt/spall.png)

When I did this for the firs time, the project didn't have that many things going around so it wasn't that hard to start adding zones everywhere, I also made the mistake of trying to measure a lot of small function, I wanted to replicate the overview that a instrumentation profiler could give thinking that the hard part was adding the instrumentation code but I could just spend a couple of hours doing it.

Turns out that a sampling profiler can mesure all the functions because they use low level API that allow them to collect a lot of data really fast, but on a instrumentation profiler a lot of times the instrumentation code could be slower than the small functions I wanted to measure and adding a lot of noise to the report.

Another issue was that how Spall works is that you pass a memory buffer and it fills it with as much data as possible and when it's filled it writes to disk the data and starts filling the buffer again. Well the Playdate is quite slow writing data to disk and if you try to mesure a lot of zones then the memory buffer fills quickly. So I could mesure around 5 seconds of data before the game slowing to a crawl and then the data wasn't useful at all.

# Computer, Enhance!

When we where getting ready for the release of the game and wanted to improve the frame rate the goal was to get to consistent 50fps, we where around ~45fps.

So based on my previous experiments I decided to start the [Computer, Enhance!](https://www.computerenhance.com/) course.

> _It’s designed to bring you up to speed on how modern CPUs work, how to estimate the expected speed of performance-critical code, and the basic optimization techniques every programmer should know._

I highly recommend it!

On the prologue Casey talks about the _5 multipliers_, 5 concepts than can drastically improve or decrease software performance.

The first one, **waste**, is the most valuable for Plydate. It explain how many CPU instructions different languages generate, Casey compares Python to C and shows how much waste there is just by simply adding two numbers.

The Playdate doesn't have support for Python but it does for LUA and even though is leaner than Python it is true that it's really hard to keep that waste on check.

So if you you have been curious on why C is supposedly so much faster than LUA I think Casey explains it really well!

The other 4 _multipliers_ are a little bit harder to explain and some of them don't apply to the Playdate at all, like multi threading, but having an understanding of this things helps a lot when you are going through.

Section 2 of the course is **basic profiling** where Casey goes step by step writing a profiler library from scratch.

# Writing a profiler

The basics of writing an instrumentation profiler is really easy, you take a time sample `t0` at the start of whatever you want to mesure and then another time sample at the end `t1` then you subtract them and get the time it took to run that code. This is enough if you have a single block of code you want to mesure. But really quickly this kind of code get's annoying to manage when you want to sample more things.

A good instrumentation profiler needs to be really simple to add new zones, if not, I'm going to be too lazy to add them and then it's going to be harder to gather the data I need.

Casey shows a trick using C++ destructors where you can add a single line `prof_start("name of the zone")` for example to the block of code you want to measure, and C++ will automatically call a function when that block of code ends, measuring the `t1` and storing the data.

Sadly C doesn't have this feature so if I want to add a new zone I need to make sure that I add a `prof_start()` `prof_end()` pair. In the future this will be easier when C gains support for [defer](https://thephd.dev/c2y-the-defer-technical-specification-its-time-go-go-go), and there are a [couple of ways to do it now](https://antonz.org/defer-in-c/) but as I'm the only programmer on the project and I don't mind opening a closing areas for me it was fine.

Another characteristic of a good sampling profiler is that it needs to be easy to completely turn off. It's the same as with adding zones easily, if you have to cleanup your code every time you have already mesure something then you will not mesure your code.

In C this is really easy as you can just use a macro that will literally remove all the code related to the profiler.

```c
#if defined(PROF)
#define prof_start(name) prof_start_internal(name, idx)
#else
#define prof_start(name)
#endif

void prof_start_internal(char * name, int idx){
	zones[idx].t0 = getTime();
}
```

Another characteristic of a good sampling profiler is that it needs to have as little overhead as possible. If your measuring code takes longer than the code you are measuring, it's worthless. And if adding many areas makes your project unusable then it's also worthless.

On **Computer, Enhance!** Casey [shows how to use RDTSC (Read timestamp counter)](https://www.youtube.com/watch?v=pZ0MF1q_LUE) instruction to measure time. It's a CPU instruction that returns a super precise and cheap timestamp that we can use to mesure performance. Casey describes it as:

> _RDTSC is very useful because it's available everywhere, you can always count on RDTSC to be something that a processor supports if its an x86 processor at all._

Well bad news for us because the Playdate is not a x86 processor it is an ARM processor, it does have however a similar instruction `DWT->CYCCNT` that the Playdate uses under the hood for `getElapsedTime()` but in userland we don't have access to this registry so we are stuck with `getElapsedTime()`, which [has a couple of downsides](https://devforum.play.date/t/similar-api-to-queryperformancecounter/25072). So if you are someone from Panic reading this, **please** consider adding support for it.

---

I quickly realized that it's also helpful specially on the Playdate to be able to turn on/off sections of my profiled areas, so I do something like this.

```c
#if defined(PROF_HUD)
#define prof_hud(a)    prof_block(a)
#define prof_hud_end() prof_block_end()
#else
#define prof_hud(...)
#define prof_hud_end()
#endif

#if defined(PROF_PYS)
#define prof_pys(a)    prof_block(a)
#define prof_pys_end() prof_block_end()
#else
#define prof_pys(...)
#define prof_pys_end()
#endif
```

So if I'm focusing on optimizing the HUD code I can just turn off the physics areas.

But one thing that Casey notes is that a good instrumentation profiler is one that you can turn on or off easil

on both revs of the Playdate. If you don't know there are two hardware revisions of the Playdate, A and B, A used the original CPU but after the first batch of Playdates sold out, the original CPU went out of stock and Panic had to change to a really similar CPU but slightly different. Turns out that depending on what you are doing games on Rev B can run significantly faster than Rev A.
