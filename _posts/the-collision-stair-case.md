---
title: 'The collision stair case'
excerpt: 'As stated on the previous post, updating all the pieces all the time was a bad idea. We needed to figure out a way to update only the ones that needed to be updated after another block got destroyed. The quick and dirty solution was to check all the pieces inside a bounding box on top of the piece that got destroyed.'
tags: collisions,gamedev,playdate,pullfrog
date: 2021/06/19
publish: true
author:
  name: Mario
  url: https://twitter.com/afk_mario
cover:
  url: 'https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/05-statircase.gif'
---

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/01-statircase.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/01-statircase.gif)

It all started with this little boy right here. A bug that had been annoying us for a couple of days, and this week was the time to fix it!

As stated on the previous post, updating all the pieces all the time was a bad idea. We needed to figure out a way to update only the ones that needed to be updated after another block got destroyed. The quick and dirty solution was to check all the pieces inside a bounding box on top of the piece that got destroyed.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/04-statircase.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/04-statircase.gif)

We found an issue with the solution because If you have a structure like the one below, you could affect pieces in a column far away to the destroyed block and the algorithm would miss them.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/06-statircase.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/06-statircase.gif)

The easiest solution was to check all the blocks above the one destroyed. We tried it, but came across a couple of issues. We updated way more pieces than the ones that were needed, not only that, but we some pieces kept freezing in the air.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/03-statircase.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/03-statircase.gif)

At this point I realized that the basic idea was flawed. The pieces need to get updated not only if the block below them gets destroyed, but also when one piece below them starts moving.

So the new solution is: after we grab one piece, we search for all pieces that are in contact with it. Then we search for pieces in contact with those pieces, and then again and again. This is fast because we save the dry pieces inside a grid, so we only search nearby cells.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/05-statircase.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/05-statircase.gif)

And it works!, we only update the pieces that need to be updated, and the code is way simpler to maintain.

A couple of tools helped us chase down this bug. We use [LDTK](https://ldtk.io/) to generate the game screen, it's very helpful, as we can generate any specific layout in seconds and start testing from there. Making the parser took us a couple of hours and has saved us a huge amount of time already.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/07-statircase.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/07-statircase.png)

We also added a grid overlay to the game through the Playdate men, to position things or figure out their coordinates.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/02-statircase.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/the-collision-stair-case/02-statircase.gif)
