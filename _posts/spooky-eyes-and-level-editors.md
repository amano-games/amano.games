---
title: 'Spooky eyes and level editors'
excerpt: ''
tags: design,playdate,pullfrog
date: 2021/12/11
publish: false
author:
  name: Mario
  url: https://twitter.com/afk_mario
cover:
  url: 'https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/eyes.gif'
---

We made the decision last year to always teak a break and focus on a spooky game every year, and try to finish something in a month or two.

This year we wanted to try and do a 3D game, we already have a kind of spooky game we did [Gossip Ghost](https://afk-mario.itch.io/ghossip-ghosts) but we never finished it, and it left us with an urge to try it again later.

![iLspod.png](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/gossip.png)

One thing that I wanted to try is [Godot](https://godotengine.org/), as a Linux with a bad internet user Unity tended to be a little hostile. Things have improved, the Editor now more or less works but still with some rough edges.

We spent around 1 month and a half on a small 3D demo of a game, with the idea to maybe make it something bigger, turns out doing 3D can get tricky, more so when you are learning a new programming language, game engine and asset pipeline. In general, the experience was positive, and we are excited to try and do more 3D games next year, but our time was up, and we decided to first finish Pullfrog.

![Screen_Recording_2021-10-06_at_12.28.56_AM.gif](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/spoopy.gif)

Possibly in another post we will talk about our experience with Godot and 3D games in general, but I'm trying to finish an entry here.

## Eyes and levels

The last thing we were working on before taking a break was our _eye_ system. The idea is to have some sort of hard currency that you need to advance to the next level. This is the mayor difference between this new version of the game, the concept of levels. We started the development with the idea to do something more similar to a dungeon crawler than an arcade game.

The idea is that every piece has a probability to spawn an _eye_ in one of their blocks, and if you clear all line of pieces containing an _eye_, you get it. After you fill the quota with eyes you need per level, the door unlocks, and you can go a talk to a pondering frog merchant, who will eventually give you a nice perk before advancing to the next level.

![sss.gif](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/eyes.gif)

I loved implementing all these things, after months of tracking performance and trying to keep things under a CPU budget, being able to put as much polish as possible in little details was a joy to work on.

## Level editor

One of the things we love about PICO-8 is the integrated level editor, it may not be much, but just having that ready to use for any game adds a lot of possibility to your game. For a hard core use of the PICO-8 tile map editor check out [@calixjumio](https://twitter.com/calixjumio/) who always takes the level editor to an extreme in a interesting way.

For the original Pullfrog you may not know this, but we used the tile map editor extensively. The main reason was for testing, as this is a complex arcade game with a custom physics engine and complicated rules, we had to test a lot of weird situations and the easiest way to start the game on that situation was using the tile map editor.

![pullfrog_0.gif](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/pullfrog.gif)

From the start of the PlayDate version we made the decision to find a level editor for our internal testing or in the worst case build one ourselves _by hand_. We don't need much, just paint some tiles and have at least a flag per tile telling what kind of tile it is.

The PlayDate SDK comes with an example on how to use [Tiled](https://www.mapeditor.org/), we have [used it in the past](https://hyperbeard.com/game/the-balloons/) and the experience wasn't great, granted it was our first time doing a tile map game and we were using a hacky plugin to transform the map to unity game objects but in general Tiled seemed like a complicated solution for a really simple problem.

I have been following [Deep Night](https://deepnight.net/) from some time now, I'm a fan of the [game dev articles](https://deepnight.net/tutorial/a-simple-platformer-engine-part-1-basics/) and saw the release of [LDTK](https://ldtk.io/) which seem promising. I tried using it while working on [The lost night](https://afk-mario.itch.io/the-lost-night) but we were already too deep into the game and would need to rewrite a lot of stuff to make it work, but it left a great impression on me. Making a parsing system for our PlayDate game sounded more fun than trying to use Tiled.

### Workflow

One of the things I love about LDTK is that the map file is a JSON file, so there is no need for an export → engine step, we can just ready the map JSON file and react to that. Also, the file structure is well-thought-out to make the parsing job easier, [and the documentation is really good](https://ldtk.io/json/).

So I started writing my LDTK parsing module, currently it consists of 160 lines. We are not using the full list of features LDTK has, just a small subset of things that we require for the game, and every time we require something else I go and add a couple of lines to the parser, and we are ready to go. If we start building a lot of levels, I may need to split the levels in files and load them depending on where the player is, but that's future Mario's problem.

![Screen Shot 2021-12-10 at 14.23.59.png](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/ldtk.png)

We have a couple of LDTK's entities to quickly iterate over the game, one that controls in which level the player is going to spawn and one that controls where in the level the player is going to spawn and with which properties.

![Screen Shot 2021-12-10 at 14.26.00.png](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/entity.png)

We also have one entity per shape of piece, this allows is to specify what kind of piece it is (more on this in the next post) and if the piece should have an eye when it spawns. So if we have a specific bug we want to try, we just need to set it up on the map and the game starts like that.

### The world

We currently don't have a specific plan on how we are going to handle the level progression, the current way it works is that when you open the door and fall to the next level, the level that it's directly below the one you were before gets loaded, and if there is no other level below we just restart the previous level. This works fine for prototyping, but we need to figure a good way to present the different mechanics that we have planned, we have a couple of ideas, but I don't want to spoil them until we have something basic implemented.

![Screen Shot 2021-12-10 at 14.38.50.png](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/entity.png)

## The future

The game will be out when it's finished, this means we have no idea when that would be, but we would like to at least have an early access version when the PlayDates start arriving to people, so we can have feedback and add the finishing touches to the game.

Meanwhile I leave you with a Gif showing how we tend to debug UI elements.

![https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/indicator.gif](https://amano.sfo3.digitaloceanspaces.com/devlog/spooky-eyes-and-level-editors/indicator.gif)
