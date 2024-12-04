---
title: 'How to correct a corner'
excerpt: 'There are many techniques that you can apply so that a platformer game feels good. One of those is corner correction.'
tags: PICO-8,collisions,gamedesign,gamedev,playdate,pullfrog
date: 2021/07/05
publish: true
author:
  name: Mario
  url: 'https://merveilles.town/@mario_afk'
cover:
  url: 'https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/corner-correct.gif'
mastodon:
  host: mastodon.gamedev.place
  username: amano
  postId: '110889752734607429'
---

There are many techniques that you can apply so that a platformer game _feels good_. One of those is corner correction.

![https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/corner-correct.gif](https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/corner-correct.gif)

As with most of these techniques, the goal is to assist the player in getting to the position where they want to be. Even if there is something in the way that wouldn't let them. In this case we are moving the player a few pixels to the sides so that they clear the platform above them.

In the [PICO-8 version of Pullfrog](https://afk-mario.itch.io/pullfrog), we solved this using multiple colliders. We would check which one of them triggered the collision, based on that, we would apply some logic to move them where we wanted. This worked fine but the problem is that we where checking **all the colliders** every frame. It was hard to maintain, and an expensive operation, dropping frames when there were a lot of pieces in the screen.

![https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/ezgif.com-gif-maker.gif](https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/ezgif.com-gif-maker.gif)

When starting the Playdate version I imposed myself a challenge, to have the same behavior using only one collider. The first thing we tried was to compare the position of the player with the object they collided with. Check if the distance between them is less than a certain amount, and if it is, move the player in the opposite direction.

![https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/03.png](https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/03.png)

This worked fine, but it was a little more complicated than what we needed, and caused a couple of undesired consequences. For example the jump distance would get altered and you would miss platforms that you would otherwise land on.

On top of that our physics logic for moving platforms was getting too complicated. Then someone on the Playdate Discord shared [an old post by Maddy Thorson](https://maddythorson.medium.com/celeste-and-towerfall-physics-d24bd2ae0fc5) about the physics system on Towerfall and Celeste. After reading it a lot of things _clicked_, and I got excited to change my broken physics mess for a more elegant solution.

For the corner correction Maddy doesn't go in to detail, but you can see and implementation on the [Celeste 2 PICO-8 game repo](https://github.com/ExOK/Celeste2). It took me a while to understand it, because PICO-8 code tends to be a little bit hard to read.

The main takeaway I got from Maddy's post and the Celeste 2 code, was to split the movement into two functions. One for X and one for Y. This made everything easier to think about and easier to resolve the collisions. In the case of corner correction, once we detect a collision, we try to move you out of it depending on the direction that you where moving. If while correcting you in one axis you collide again then we just don't move you, after that it's time for the other axis to try and correct you.

I'm thinking of doing a more in-depth explanation with some code. But haven't had the time to add code snippets support to the Devlog and this post is already getting big!.

A nice thing about doing this from scratch, is that now the code is less coupled with the player. This allow us to apply the same logic on different stages of the game an player movement. For example: If you are going to get squished by a moving piece, now we try to move you to safety.

![https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/squish-export.gif](https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/squish-export.gif)

Another example would be when you pull a piece and it collides with another one, we try to move the piece so that it ends up where you intended it to be.

![https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/piece-correct-export.gif](https://media.amano.games/devlog/how-to-correct-a-corner/how-to-correct-a-corner/piece-correct-export.gif)

Did you noticed how the piece pushed you? this was an added benefit form the new physics system and a big difference from the PICO-8 version of Pullfrog, but we will talk about this is a different post.
