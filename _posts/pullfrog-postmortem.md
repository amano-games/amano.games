---
title: 'Pullfrog postmortem, Long Live Pullfrog 2-Bits'
excerpt: 'So towards the end of the year, Mario managed to get his hands on a Development console for the handheld "Playdate" and we decided to attempt do make a second version of Pullfrog, this time featuring a playful little crank and seemingly less restrictions except for the apparent ones like the black and white color of the screen. Oh the naivety.'
tags: post-mortem,gamedev,pullfrog,playdate,PICO-8
date: 2021/05/29
publish: true
authors:
  - name: Jp
    url: https://twitter.com/eljovenpaul
    mastodon: '@jp@merveilles.town'
cover:
  url: 'https://media.amano.games/devlog/pullfrog-postmortem/pullfrog-postmortem-008.png'
mastodon:
  host: mastodon.gamedev.place
  username: amano
  postId: '110889742333373325'
---

Back in **2020** during the month of may [Mario](https://merveilles.town/@mario_afk) and myself started working on a game for [PICO-8](https://www.lexaloffle.com/pico-8.php) as part of a monthly game development club. I've always loved playing Tetris and other falling block puzzle games, although Tetris is more of a skill game than a puzzle game such as [Panel De Pon](https://en.wikipedia.org/wiki/Puzzle_League). I've also always loved playing platformers. Moving around a character that has well-polished controls makes it feel like controlling an extension of your body. So I'd kinda wanted to mash-up these two things for a while.

![https://media.amano.games/devlog/pullfrog-postmortem/frogtris-cols-export.png](https://media.amano.games/devlog/pullfrog-postmortem/frogtris-cols-export.png)

I started by trying to lay down the feel of the character movement. I am not a programmer but attempting this really helped me understand how games and code really behave. and so after a while at work I managed to produce this janky-ass thing.

![https://media.amano.games/devlog/pullfrog-postmortem/pullfrog-postmortem-003.gif](https://media.amano.games/devlog/pullfrog-postmortem/pullfrog-postmortem-003.gif)

And then I tried again. Getting the basic movement allowed me to focus on important platforming details like "Coyote Jumping", collision corner corrections and input buffers. and so the second version was a little better.

![https://media.amano.games/devlog/pullfrog-postmortem/pullfrog-postmortem-004.gif](https://media.amano.games/devlog/pullfrog-postmortem/pullfrog-postmortem-004.gif)

This is where I hit my programming ability wall and [Mario](https://twitter.com/afk_mario) took over. He refactored the code, made pertinent changes, and continued to develop, what was initially just an exercise in learning good platforming _feel_, into a complete game. We came up with the look and core loop for the game, which is to move around and pull the falling blocks in to place with your tongue in order to clear lines and obtain power-ups, and keys in order to open a door at the end of the game. This Unlocks a new characters that play slightly different to the frog. Ideas were sketched, mechanics were polished, pixel art was pixeled. PICO-8's token limit was reached over and over again, but after 30 days we finished [Pullfrog](https://afk-mario.itch.io/pullfrog).

![https://media.amano.games/devlog/pullfrog-postmortem/concept.png](https://media.amano.games/devlog/pullfrog-postmortem/concept.png)

We learned a ton from the experience. Collisions, movement, performance, pacing, polish, math. Even though we were working remotely, most of the time we were talking on discord each doing our part. Finishing this game really made us feel that with enough time and resources we could make any kind of game we liked. So we put it out on [Itch.io](https://afk-mario.itch.io/pullfrog), [Lexaloffle](https://www.lexaloffle.com/bbs/?tid=38636), and [Newgrounds](https://www.newgrounds.com/portal/view/759921). People responded great to it, we were content and moved on to the next thing. We worked on a couple more pico ideas. But the itch remained. The "what if?". What kind of a game could we have made without the limitations of PICO-8?

![https://media.amano.games/devlog/pullfrog-postmortem/pullfrog.gif](https://media.amano.games/devlog/pullfrog-postmortem/pullfrog.gif)

So towards the end of the year, Mario managed to get his hands on a Development console for the handheld "[Playdate](https://play.date)" and we decided to attempt do make a second version of Pullfrog, this time featuring a playful little crank and seemingly less restrictions except for the apparent ones like the black and white color of the screen. Oh the naivety.

![https://media.amano.games/devlog/pullfrog-postmortem/pullfrog-postmortem-008.png](https://media.amano.games/devlog/pullfrog-postmortem/pullfrog-postmortem-008.png)

So this is the plan:

We want to make a version of Pullfrog that features more polish and variations in gameplay like:

- Different kinds of blocks.
- Some enemies and or bosses.
- Level progression.
- Replayability mechanics.
- Make use of the crank controller.
- Smoother animations and controls.

Slowly making progress as we get to know the [Playdate](https://play.date) console more and more. Developing tools and better ways to work. We're gonna try to keep this devlog going as we work and hope that whoever reads it can get something out of it. Thanks for reading.

You can follow us on [twitter](https://twitter.com/amanogames_) and stay updated on the development of our games.
