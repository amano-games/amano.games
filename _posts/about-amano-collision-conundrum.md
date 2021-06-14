---
title: 'About Amano & the collision conundrum'
tags: pullfrog,playdate
date: 2021/06/14
excerpt: 'So a couple of months back, Mario and I were happily working away on The game, finding out the workflow and working out the kinks of developing for the PlayDate. We laid down the main mechanic, blocks were falling and colliding correctly the character was moving alright but we were doing everything on the simulator, NOT testing on the actual device. so when we decided to take it for a spin…  it crashed.'
cover:
  url: https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/11-about-amano.gif
author:
  name: JP & Mario
  url: https://amano.games/
---

## About Amano

**JP:** So a couple of months back, Mario and I were happily working away on The game, finding out the workflow and working out the kinks of developing for the [PlayDate](https://play.date/). We laid down the main mechanic, blocks were falling and colliding correctly the character was moving alright but we were doing everything on the simulator, NOT testing on the actual device. so when we decided to take it for a spin…  it crashed.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/10-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/10-about-amano.png)

Turns out, the way we were handling collisions wasn’t the best. So we got kinda bummed out and stopped working on the game for a bit.

During that off-time decided to address another issue. [Mario](twitter.com/afk_mario) wasn’t very thrilled about our games coming out under his personal [itch.io](https://afk-mario.itch.io/), [Newgrounds](https://afk-mario.newgrounds.com/), and [Lexaloffle](https://www.lexaloffle.com/bbs/?uid=21440) accounts because he’d constantly get solely credited for the games on social media and stuff. So in order to unify things in one place and give our games more of an identity, we designed a brand a website: **Amano**.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/09-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/09-about-amano.png)

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/08-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/08-about-amano.png)

^This was gonna be the logo for a while. but IDK, one morning I kinda' hated it so I changed it on a whim.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/01-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/01-about-amano.png)

We went through a ton of iterations for the text; but the hand and the eye came out pretty much on the first sketch.

Hand-made tortillas are better than their machine-made cousins, and far superior to their ( born out of the necessity to cover demand and convenience) factory mass-produced alternatives. So sometimes I go on rants about how much I love hand-made tortillas. Especially to Mario. Hence his idea to name out little project Amano. “A mano”, which translates to “hand made” from Spanish.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/11-about-amano.gif](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/11-about-amano.gif)

## The Collision _conundrum_

**[Mario:](twitter.com/afk_mario)** The PlayDate SDK has pretty much everything we needed to start making Pullfrog, One of those things is a collision system. After spending the majority of the development time making a collision system for the original Pullfrog, this came as a welcome surprise. With a reassuring feeling that if everything went bad, we could always recreate the same system as the one in the PICO-8 version.

We started working on the main character and its behavior, we wanted to recreate the same feeling and polish we had on PICO-8 so the basic collision handling that we had on the PlayDate wasn't enough. Fortunately it wasn't to hard to customize and we ended up with even a better version of what we had in PICO-8. After a couple of days we already had the character moving in the screen! we already kind of had a game, so I built the game and send it to my device and started moving the little frog around.

After solving the collisions for the player, we though the next step would be as easy. Add falling pieces, and then we had the base game ready. We tried to keep things simple, so we had each the pieces with a list of blocks, and each one of blocks had their collider. We need this because when the player starts pulling and destroying the pieces with it's tongue we need to know which block was stroke.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/07-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/07-about-amano.png)

After a couple of weeks, I decided it was time to try the game again on the device, we where so excited that we added a hacky system for playing SFX's. I build the game, send it to the device, boot it up and then ... the game crashed.

Ok ok nothing serious, maybe I did something dumb with my hacky SFX manager and I could fix it later. I disabled the SFX's and tried again, after a few seconds of moving the little frog, the game crashed again!. After a couple of hours trying to figure out what was causing the issue, we realized it was the amount of blocks on the screen. Turns out that having one collider per block and checking collisions every frame was expensive and not a good idea, we needed a break.

Out previous game, The Lost Night, is a small spooky themed RPG made in PICO-8 where we hit all the platform limits at the very end of the development process and we had to scratch about 60% of the content we had planed for the game. By the end of the development we were bummed out. We didn't want the same thing to happen with Pullfrog2. Saddened, we started discussing our options, but nothing seemed to work better than what we had. We shifted our focus on something more exciting, Amano. We spent one month building the website, and it was a nice break, so by the end we were eager again go back and fix the game. [You can check out the source code of the website if you want.](https://github.com/amano-games/amano.games)

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/12-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/12-about-amano.png)

After we knew the issue was having too many colliders in the game, I went back and started planing on how to reduce that number. The first thing that came to my mind was to have one collider for the bigger part of the piece and in some cases an extra one. This meant we would need to check twice each frame for half of the types of pieces. On top of that we still needed to know which block was struck by the tongue and would need an extra step.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/04-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/04-about-amano.png)

After a couple of hours I realized that if the pieces weren't moving, it didn't matter if we had all the colliders in the screen. Then we could keep a single collider per block and use them for the interaction with the frog's tongue. Now we needed to figure out how to handle when the pieces were falling as they only care about other pieces below them.

Next thing I tried was to query other sprites inside the bounds of the piece and check if there was something that should stop them. We made a quick test on the PlayDate and it Worked!. We could have the screen full of pieces falling and the game kept running. The frame rate drops a bit but that also happens on the PICO-8 version and no one has complained yet. I realized we didn't need to update the pieces when they are "dry", which is how we call them when they change their pattern to a state where they can be destroyed. We only needed to update the pieces that are above one that got destroyed the last frame. We can even have the screen full of dry pieces without any issue with the frame rate, which is how you play 99% of the time.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/06-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/06-about-amano.png)

There was only one thing else to fix. Some pieces have an empty block space in them, which makes them always a source of tricky bug. I figured to first check the big bounding box of the piece and then, if it collides, check if it overlaps with the empty space in the piece and ignore it. It's similar to the many colliders in the piece approach but with the advantage that we only check the empty space once, instead of twice for each piece.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/05-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/05-about-amano.png)

It worked!. But then I kept thinking there must be a better way of doing it. JP kept telling me that we could check the collisions based on a tile map like we do in PICO-8 version. It's tricky because the pieces can move around while you are pulling them, so when they are falling, we need more sophisticated collisions. And when they are in the floor we don't. We had a way of checking if the cell in the grid is occupied by a block for the line clearing, so we could use that while the piece where in the floor and use our new system when they are falling.

I'm sure there is still room for improvement but the game is playable in the device and we are happy with it for now. At the end it's similar to how we handle things in PICO-8, but it was hard to know how to translate that in the PlayDate without trying it first.

We where so happy about the game running in the PlayDate that JP did the launcher cards for the game, they look SO GOOD.

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/03-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/03-about-amano.png)

![https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/02-about-amano.png](https://amano.sfo3.digitaloceanspaces.com/devlog/about-amano-collision-conundrum/02-about-amano.png)

Next up is dealing on how the pieces and the frog behave when you pull them and they collide with the frog. We have some ideas on how to improve this based on what we learned from the PICO-8 version.
