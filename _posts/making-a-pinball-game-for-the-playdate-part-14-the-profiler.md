---
s3_path: devlog/making-a-pinball-game-for-the-playdate-part-14-the-profiler
title: 'Making a pinball game for Playdate: Part 14, the profiler'
tags:
  - pinball
  - devils-on-the-moon-pinball
  - playdate
  - programming
  - profiler
  - performance
excerpt: There was no other option but to write our own profiler.
publish: false
date: 2026/09/24
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

Well bad news for us because the Playdate is not a x86 processor it is an ARM processor, it does have however a similar instruction `DWT->CYCCNT` that the Playdate uses under the hood for `getElapsedTime()` but in userland we don't have access to this registry so we are stuck with `getElapsedTime()`, which [has a couple of downsides](https://devforum.play.date/t/similar-api-to-queryperformancecounter/25072). So if you are someone from Panic reading this, **please** consider adding support for it!.

I quickly realized that it's also helpful to be able to turn on/off sections of my profiled areas, so I do something like this.

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

So if I'm focusing on optimizing the HUD code I can just turn off all the other areas.

One thing you might have noticed is that the ` prof_start_internal` function has a second param, the index of the zone where its supposed to save the information, there are a couple of ways of doing this but the easiest specially for us that we are writing single threaded code.

What we need is a unique ID that increases every time we use it. Turns out that C has the [`__COUNTER__`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3384r1.html) macro that works perfectly for that.

```c
#define prof_start(name) prof_start_internal(name, __COUNTER__)
```

So we have an easy way to record how long it takes to run some code, an easy way to add new zones and a way to disable them quickly.

The next problem you might encounter is that a program works like a stack and normally you want to measure the time it takes a function to run and have a way to distinguish the time it takes it's children to run.

This difference is called exclusive/inclusive timing, exclusive is only the time it took a function to run minus the measured children. And inclusive is the time it took the function counting also it's children.

![inclusive-vs-exclusive.svg](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-14-the-profiler/inclusive-vs-exclusive.svg)

This get's quite complicated if you are trying to mesure recursive code. But Casey shows a neat trick to handle all this problems.

We need an array of _frames_ that is the size of our deepest callstack.

```c
#define MAX_ZONES 250
#define MAX_FRAMES 64

struct frame {
	int zone_idx;
	int parent_idx;
	int start;
	int prev_inclusive;
}

struct profiler {
	struct zone zones[MAX_ZONES];
	struct frame frames[MAX_FRAMES];
}
```

Then when we start recording a zone we save the anchor's inclusive total and record who the it's parent is.

```c
// prof_start
profiler.frames[prof.frame_count++] = (struct prof_frame){
	.zone_idx = idx,
	.parent_idx = profiler.parent_idx,
	.prev_inclusive = zone.inclusive,
	.start = getElapsedTime(),
};
profiler.parent_idx = idx;
```

And when the close the zone

```c
// prof_end
struct frame *frame = &profiler.frames[--prof->frame_count];
int elapsed         = getElapsedTime() - frame.start;
profiler.parent_idx = frame.parent_idx;

parent_zone.exclusive -= elapsed;
zone.exclusive += elapsed;
zone.inclusive = frame.prev_inclusive + elapsed;
++zone.hit_count;
```

So we subtract the children time to the parent exclusive time handling nesting and recursive code. If you want a better explanation on how this work's give [Computer, Enhance!](https://www.computerenhance.com/) a try.

The neat thing about doing this myself is that I have complete control over how things work. If I know I'm not going to record more than 250 zones in my game I can just declare that as the array capacity. I can even save some memory by using 16 bits for the indexes. Compressing information to the bits that I actually need.

By the end of development we where using almost all the 16 MB of RAM available on the device. So much so that Playdates that left our game open and then put their device to sleep crashed after a while. [A later OS patch fixed this](https://sdk.play.date/changelog/#_3_0_5)

Well we have a way to mesure any area of our code in a really simple way, how useful is this really?

On the Computer Enhance this works because they are measuring parsing a JSON file a single time. The program boots up, parses a JSON file, mesures the time it takes each section to run, records how many times each function was called and with that you can have a pretty good idea on how long it takes to run your program and which parts are slow.

For our case, is not that helpful. It gives us a single value for a function that in our case can run at least **200** times a second, and it varies a lot depending on what was the state of our game at any given time. Not only that but if we try to draw this value to the screen it changes so much that it's imposible to read.

On one of the last videos about making a profiler Casey mentions that this is not well suited for games, but that in the [August 2004 Game Developer Magazine](https://archive.gamehistory.org/item/253f9dd6-1460-4cf1-afd9-1a316acb6d68) issue [Sean Barrett](https://nothings.org/) published the implementation of an **Interactive profiler** called [IProf](https://silverspaceship.com/src/iprof/)

![iprof-original.png](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-14-the-profiler/iprof-original.png)
