---
title: 'Let’s finish this'
excerpt: 'We are back working on Pullfrog! What happened?'
tags: pullfrog,playdate,design
date: 2023/08/14
publish: false
author:
  name: Mario
  url: 'https://merveilles.town/@mario_afk'
cover:
  url: 'https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/2-slide.png'
---

It’s been a long time since we talked about **Pullfrog**. The main reason being that we paused the development to work on another game called **Don Salmon**, you can read more about it on the previous [devlog](https://amano.games/devlog/lets-talk-about-don-salmon).

But now we are back working on **Pullfrog**, with the main goal of **finishing it**, we haven’t yet, but we are close! We are at the stage where we are comfortable with what the game is and what it isn’t.

So buckle up because this is going to be a long one.

![graph.svg](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/1-graph.svg)

## What happened?

When we started working on **Pullfrog** for [Playdate](http://play.date/), the plan was to work on it for a month, three months tops. The plan was to port the [PICO-8 version](https://afk-mario.itch.io/pullfrog) and improve some things on the way. It took us a year to have the basic version of the game we wanted to do. By the end we where a little tired, so when we heard **Panic!** was looking for games to publish, we saw it as an opportunity to spend some time on a proper pitch and take a break from developing the game.

![s5.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/2-slide.png)

While we waited to hear from **Panic!** we started working on Don Salmon. We wanted to apply everything we had learned from making Pullfrog, on a game where the limitations were different. We wanted to experiment on new platform mechanics, like wall-jumping, air jumping, dashing etc.

One day we got a tweet from [@Guv_Bubbs](https://linktr.ee/guv_bubbs) and [@TYMplaydateshow](https://tinyyellowmachine.com/) asking us on the status of the project. At that point we were deep on the development of **Don Salmon**, and we haven’t heard anything from **Panic!** so we replied that the project was on indefinite hiatus while we finished **Don Salmon**. **Panic!** saw this and emailed us asking us if we were still interested in publishing the game but cut the scope of it.

Who would have thought that lowering the scope saved the game.

![old-vs-new-clean.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/3-old-vs-new-clean.png)

Before **Panic!** approached us, we looked at the work we had left to do, and it looked like _a lot!_ Trying to make a different enough game from the PICO-8 version put a lot of pressure. So when **Panic!** contacted us after not working on the game for a year and asked us if we were interested in reducing the scope and finish the game, we became excited. Ideas started coming through.

The first thing was to stop trying to make a different game. We scrapped all the ideas to make it more like a dungeon crawler with enemies and a final boss and focused on closing the loop of the game. Make it work as the **PICO-8** version, which we knew that worked, but with everything we had learned from the year working on making it better.

## Make everything bigger

![Screenshot 2023-08-11 at 15.29.51.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/4-frog-evolution.png)

One of the first things [Jp](https://merveilles.town/@jp) did was to completely re-do all the game assets to make the resolution bigger. After playing other **Playdate** games, we came to the conclusion that the game would read better by changing the resolution of the character and the pieces.

## The shop

![old-shop.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/5-old-shop.gif)

The second part was removing the shop logic of the game. The initial plan was to have a shop like the one in [Downwell](https://downwellgame.com/), and allow you to step out of the game and use the eyes as currency to get new power ups.

As you can see, we had everything working already, but we decided it was something that the game didn’t need and added a lot of complexity to the project. The way we did it in the **PICO-8** version was that every time you manged to collect 3 lines, the shop would pause the game and appear in front of you.

![shop-export.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/6-new-shop.png)

The thought of deleting all that code and focusing on the important parts of the game felt good. After that it took us about two weeks to get back up to speed, but once we did, we where closing tickets left to right.

## The eyes

One consequence of changing the shop was that we had all these systems based on the eyes, but now that you get the shop they didn’t have any value.

![old-vs-new-bussy.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/7-old-vs-new-bussy.png)

In the **PICO-8** version you would collect eyes, purchasing them on the shop and a secret door would open once you got five eyes. Something we like from the new version, is that to collect an eye, it needs to be inside of a cleared line. If you break an eye piece, you loose the eye. This makes the game a little more like a puzzle and forces you to think more about which pieces you destroy.

![eyes-2-export.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/8-eyes-collect-destroy.gif)

Now that you don’t collect the eyes in the shop, we had more space left for power-ups.

## 1UP

One thing we discovered while working on this new version is that having an extra life can be nice, but too many and the game is less fun. Getting squished by a piece but being able to get a second chance and go back to the game felt great.

So we came up with the power up of a **1UP**, there will only be one each run, so it is precious but gives you that second chance.

![1up-export.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/9-second-chance.gif)

So yeah! We are _almost_ done, we are excited to see what people think of the game, and happy with the progress we have made in the last couple of months. As I write this we finished the **first beta build,** there are a couple of months left of work still, but we are getting close!

![eyes.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/lets-finish-this/10-eyes.gif)
