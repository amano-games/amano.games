---
s3_path: devlog/making-a-pinball-game-for-the-playdate-part-15-the-interactive-profiler
title: 'Making a pinball game for Playdate: Part 15, the interactive profiler'
tags:
  - pinball
  - devils-on-the-moon-pinball
  - playdate
  - programming
  - profiler
  - performance
excerpt: We build a profiler tailored to the playdate.
publish: false
date: 2026/09/22
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

Sean implementation is based on a previous article by [Jonathan Blow](http://number-none.com/blow/index.html) In which he explains why traditional profilers are not a good fit for video games, and how an interactive profiler could look like.

![iprof-sokol.gif](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-15-the-interactive-profiler/iprof-sokol.gif)

on both revs of the Playdate. If you don't know there are two hardware revisions of the Playdate, A and B, A used the original CPU but after the first batch of Playdates sold out, the original CPU went out of stock and Panic had to change to a really similar CPU but slightly different. Turns out that depending on what you are doing games on Rev B can run significantly faster than Rev A.
