---
title: 'Making a pinball game for Playdate: Part 09, the ball HUD'
tags: playdate,devils-on-the-moon,pinball,gamedesign
excerpt: 'How do we show how many chances you have left?'
publish: false
date: 2025/07/30
cover:
  url: https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/end-result.gif
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

Kind of a silly thing that made me really happy yesterday

Before we continue this post has spoilers for our game [Catchadiablos](https://play.date/games/catchadiablos/).

A long time ago I remember there was a thread on twitter talking about lives UI in games and how it tends to be ambiguous.

![Filled 3](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/filled-3.png)

When you have some sort of HUD that has a filled and unfilled icon for how many tries you have left and you lose, do you expect to have another chance?

![Filled 1](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/filled-1.png)

![Filled 0](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/filled-0.png)

The problem is, how do you set the right expectation? And if it's ambiguous, should you resolve the tension at the resolution with an **upward beat** or a **downward beat**?

When we started building the HUD for _Devils on the Moon pinball_, we talked about this. We knew we wanted to give the players 3 balls to play with. How do we show that in the UI?

# Option A

We show the three balls filled in the UI, and then when you lose one, we remove it? But wouldn't that give you the expectation that you had 3 more balls apart from the one that you had at the beginning?

Later on, when the ambiguity is resolved and you lose the last game, the game ends. If you had the expectation that you still had an extra ball, that's a big downward beat.

![Option A](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/option-a.png)

# Option B

We show only two balls, as that's the chance you have left? But then we never show the UI with three balls; the UI has the space to show you three balls filled, but we never do! It felt wrong somehow.

![Option B](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/option-b.png)

Again, kind of silly.

After like a day of debate, we ended up with option B, it's better to not risk disappointing the player. That's how we show it in the **Catchadiablos** pinball

![Catchadiablos Pinball](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/playdate-20250730-131927-export%201.gif)

Yesterday, though, we were working on the ball spawning **polish**, adding animations, making sure timings were right, etc. It sounds simple, but we had to change a lot of things, as before we weren't destroying the entity and spawning it again; we just used the same ball entity and just reset its position.

At the end, when we were tweaking the timings, we had an idea: what if we show the 3 balls filled in the UI, and with the spawning animation, we remove the ball from the HUD, signaling that you just spent one ball of the 3 balls that you have available? Best of both worlds!

![End result](https://media.amano.games/devlog/making-a-pinball-game-for-the-playdate-part-09-the-balls-hud/end-result.gif)

Kind of silly, but really happy with how it turned out.

I don't know what awaits us in our next adventure, but see you there when it happens.
