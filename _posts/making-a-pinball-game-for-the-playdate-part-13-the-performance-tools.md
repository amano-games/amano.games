---
s3_path: devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-tools
title: 'Making a pinball game for Playdate: Part 13, the performance hunt'
tags:
  - pinball
  - devils-on-the-moon-pinball
  - playdate
  - programming
  - profiler
  - performance
  - sampler
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

![sampler.png](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-tools/sampler.png)

Our physics system runs 4 times on every frame. One thing you need to do in a physics system is to collect colliding pairs. You do your broad collision detection and mark which entities are colliding with who. One thing you want to avoid is checking the same pair multiple times so you need some bookkeeping that is cheaper than your broad collision detection. One way of doing it is using a bit flags. You can read a more in depth explanation on the book [Real time collision](https://realtimecollisiondetection.net/books/rtcd/) detection in the section _Avoid retesting_.

How it works is you generate a bit array that can hold a bit per entity pair, so when you get a pair of entities you want to check first you check if their pair bit is set, and if it is you can skip doing the full test, if not you do the full test and then set the bit.

Simple and effective. Well as the game grew and we created more entities we ended up with around 450, this means that our bit array needed to be `450 * 449 / 2 = 101025 bits` create and clear this array every frame and we are clearing **~56KiB** of memory every frame. I skipped the last part on that books chapter but the warning was there!

> _Even for a modest number of objects, this operation now quickly becomes very expensive._

There are other options to do this like keeping a timestamp on each body and each time we do a query making sure the timestamp equals the query timestamp but after thinking about it for a bit, in our game we only have colliding pairs between balls and bodies and we have a single ball. Sure I would like to be able to add multi ball to our game or any other table but then again it would be 3 balls at most, so I decided to just keep a small linear array and scan it every time we need to check if those pairs are already present.

No more memory clearing and we gain a fair bit of perfomance there.

The problem is we know the game runs faster, we have a simple FPS counter and you can see the graph on the resource view of the Playdate SDK but it's hard to measure how fast. Or even worse if somehow something else became slower because of your change.

![device-info.png](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-tools/device-info.png)

# The profiler

To mesure this one tool you can use is a profiler. The problem is that there is no builtin profiler for the Playdate. And any of the existing solutions tend to be too big for it.

There are also nuance differences on profilers that I didn't realized before stating this project. What I have always used before this in other projects is what is called a Sampling profiler, an automated tool that mesures the code that you already have by interrupting the process and measuring automatically how long each part of your code took. Another type is instrumentation profiling where you manually add zones to your code to mesure specific areas you are interested in.

Each of them has it's own pros and cons. For example the biggest and most obvious pro for the sampling profiler is that you don't really need to do much to gain a lot of information about your game code. You just run your game, play for a bit, and then go to the profiler and analyze the data that it captured. But this was really hard on the Playdate even if wanted to code my own, you don'have the permissions you would need to modify how a process runs on the playdate. So a sampling profiler would only be possible my desktop computer using the simulator, but that will be almost useless as the Playdate limitations are really hard to emulate on desktop.

The instrumentation profiler seems more feasible because I can manually edit my code and add the zones to where I thought the game was being slow.

There are a couple of profilers I knew about and wanted to try. Even if I only managed to profile on desktop to start, the cost of doing it is so low even if it gives my any small insight it will be worth it.

First I started reading the docs for the [Tracy](https://tracy.nereid.pl/) profiler but quickly realized that to be able to use the instrumentation API I needed to compile the project using C++, and I didn't want to get in to that rat hole.

I found the wonderful [Spall](https://gravitymoth.com/spall/spall-web.html) profiler which had a single header implementation with a simple API that I could provide my own memory and functions for reading and writing files.

This looked promising!

![spall.png](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-13-the-performance-tools/spall.png)

When I did this for the firs time, the project didn't have that many things going around so it wasn't that hard to start adding zones everywhere, I also made the mistake of trying to measure a lot of small function, I wanted to replicate the overview that a instrumentation profiler could give thinking that the hard part was adding the instrumentation code but I could just spend a couple of hours doing it.

Turns out that a sampling profiler can mesure all the functions because they use low level API that allow them to collect a lot of data really fast, but on a instrumentation profiler a lot of times the instrumentation code could be slower than the small functions I wanted to measure and adding a lot of noise to the report.

Another issue was that how Spall works is that you pass a memory buffer and it fills it with as much data as possible and when it's filled it writes to disk the data and starts filling the buffer again. Well the Playdate is quite slow writing data to disk and if you try to mesure a lot of zones then the memory buffer fills quickly. So I could mesure around 5 seconds of data before the game slowing to a crawl and then the data wasn't useful at all.

So there was nothing else to do than to write our own profiler.
