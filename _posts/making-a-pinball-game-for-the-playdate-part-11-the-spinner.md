---
title: 'Making a pinball game for Playdate: Part 11, the spinner'
tags: playdate,devils-on-the-moon,tiled,pinball
excerpt: ''
publish: false
date: 2025/11/25
cover:
  url: https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-11-the-spinner/spinner.gif
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

We are ramping up to the final stages of the game so I had to cross off one of our long standing pending features: _The Pinball spinner_

From the beginning of development, when the idea to make a pinball game started we were excited about the spinner, Jp had figure out a way to use blender to generate rotated sprites that looked good (hopefully one day he will have enough time to talk about it here). And we played the physical table of Pulp Fiction and we fell in love with its spinner.

![[pulp-fiction.png]]
![pulp fiction](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-11-the-spinner/pulp-fiction.png)

So Jp started working and soon enough had a really good spinner sprite for me to implement in to the game.

![spinner](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-11-the-spinner/spinner.gif)

Now we just needed a way to make it spin. First step I needed to detect if the ball was colliding with the spinner in some way. This was the first time we needed to know if the ball was inside a collision shape but don't affect it as a physics body. So I implemented the sensor system.

So how it works is that every frame the ball gets a list of close-by sensors nearby using the [spacial hashing](https://amano.games). and mark them as dirty. Later on I get all he sensors that are dirty, each sensor has a double buffered list of entities, and stores all the colliding bodies in its current buffer, then it compares the previous buffer with the new one and if any entity was added it fires the Body entered event, and if any entity was removed it fires the Body exited event.

With this the spinner logic became easy, if there is a ball inside the spinner sensor, the spinner angular velocity is equal to the ball velocity. And when it exits I just apply a damping factor so the spinner would eventually stop.
