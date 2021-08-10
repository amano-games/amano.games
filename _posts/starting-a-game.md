---
title: 'On starting a game'
excerpt: 'A couple of things I would recommend when starting your first game on the Playdate.'
tags: PICO-8,gamedev,playdate
date: 2021/08/09
author:
  name: Mario
  url: https://twitter.com/afk_mario
cover:
  url: 'https://amano.sfo3.digitaloceanspaces.com/devlog/starting-a-game/target-position-bug.gif'
---

This is a more polished version of a long message that I wrote in the official **Playdate** Discord server. A couple of things I would recommend when starting your first game on the **Playdate**.

## Lazy Devs

[Lazy Devs](https://www.youtube.com/playlist?list=PLea8cjCua_P0qjjiG8G5FBgqwpqMU7rBk) is one of the best teachers for game development out there. I love his tutorials because it shows you the process of doing a game from start to finish with a lot of polish and focus on gameplay. The tutorials are for PICO-8, but it also uses LUA, so a lot of things translate well to **Playdate**.

## a327ex

If you want a big LUA codebase to look at as a reference, [BYTEPATH](https://github.com/a327ex/BYTEPATH) and [SNKRX](https://github.com/a327ex/SNKRX) are good examples of finished games made in LOVE2D. They are open source so you can check how they handles everything in the games.

Basic example:

Coming from **PICO-8** I wasn't used to importing external files so I was importing _CoreLibs_ in every single file. At some point I started to wonder if that's how everyone was doing it. I looked at **[a327ex](https://twitter.com/a327ex)** code and ended up having an single `init.lua` file where I do all my imports and set up the game.

## Using a framework

The most valuable thing from a framework in my opinion is to look at their code. So you can check the general structure of the project and figure out if it works for you, or grab the things that do. In general, I would recommend against starting with a framework on top of the Playdate SDK for your first **Playdate** project. You will end up with another layer of things you have to learn.

## Scene Management

This is a common mistake, I know that I have fallen in to this trap a couple of times before. Scene management is not especially hard to do, but it's something that can impose a lot of friction between iterations of your game.

I like to start my games with the main interaction of the gameplay and make that feel as nice as possible.

In our game that would be movement and platforming. In other games it could be moving the cursor for a point and click adventure or grid movement for a puzzle game.

Making it feel good takes a lot of iteration. If you have to go through: _Title screen animation -> Main menu -> testing your small change_, it will end up as a painful process. You might even start working on tools to make that process faster. And end up spending more time doing the scene management and the tools around it than actually doing the main mechanic of your game.

In a more code-centric problem the first version of your scene system probably is not going to be the best. And you probably don't know all the things that you will need for it to work the best it can for your game. If you introduce it too early you may find yourself coding in a way to accommodate to your first attempt at your scene management system. So my advice would be start with movement first. Try to finish a game loop and if you need some scenes to make that happen do them in the simplest way possible.

## LUA and OOP

This is personal preference but a lot of the times it is better to start without OOP. It can make your LUA tables bloated in exchange for a small convenience that you may regret later on. I use the basic sprite for everything and do helper functions that accept a reference to the sprite. After a while it becomes clear if I need to abstract it in a class, but a lot of the times it doesn't.

```lua
function spriteGetMapCoords(sprite)
    local x,y = sprite.x, sprite.y
    x = math.floor(x/16)
    y = math.floor(y/16)
    return x,y
end

-- VS

local gfx <const> = playdate.graphics

class('MySprite').extends(gfx.sprite)
function MySprite:init(x,y,img)
    MySprite.super.init(self)
    assert(img)
    self:add()
    self:setImage(img)
end

function MySprite:getMapCoords()
    local x,y = self.x, self.y
    x = math.floor(x/16)
    y = math.floor(y/16)
    return x,y
end

```

**Playdate** has a lot of limitations on the amount of objects that you can update/have in every frame. So hiding them away on abstractions class can end up being a bad idea.

It's been a while since we post anything new about **Pullfrog 2Bit** and it's mainly because all the new stuff is hard to share as it is has been a lot of refactor to try to have the game running at a better frame rate in the **Playdate**. I leave you with a GIF on the latest bug.

![https://amano.sfo3.digitaloceanspaces.com/devlog/starting-a-game/target-position-bug.gif](https://amano.sfo3.digitaloceanspaces.com/devlog/starting-a-game/target-position-bug.gif)
