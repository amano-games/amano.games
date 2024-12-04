---
title: 'On "Bouncy" Animation'
excerpt: 'Another Equally important decision, is choosing which poses you want to emphasize in order to get that reactive feeling when a character interacts with the world.'
tags: PICO-8,animation,art,pullfrog
date: 2021/06/26
publish: true
author:
  name: Jp
  url: https://twitter.com/eljovenpaul
cover:
  url: 'https://media.amano.games/devlog/bouncy-animations/07-bouncy.gif'
mastodon:
  host: mastodon.gamedev.place
  username: amano
  postId: '110889749193805586'
---

On some occasions people have commented on the character animations of the original Pullfrog. Saying how they look very bouncy, and asking how many frames we were using to get them to look so smooth. This used to throw me off-guard because the answer is one frame, or more like, as few as I can possibly draw.

![https://media.amano.games/devlog/bouncy-animations/01-bouncy.gif](https://media.amano.games/devlog/bouncy-animations/01-bouncy.gif)

This is probably something that’s been talked about a million times, but here’s my take on the subject. To me, character animation is not about how smooth the movement is, or about trying to get in as many frames as possible to really make the character feel alive. It’s quite the opposite actually. I want to convey the action in the **least amount of frames possible** because I’m _lazy_, animation is a lot of work, and most people don’t really care or notice. Let the player’s mind fill-in the blanks. Well, those aren't the only reasons. See, I’ve worked in animation before, so while economizing is important to get work done, I like the challenge of getting an action to come across with very few frames. It feels elegant. It feels like I solved a problem.

So why DO these animations feel “Smooth” or “Bouncy”?

The most important thing to keep in mind are the **key poses** of an **action**.

A key pose is THE most essential frame of an action that the viewer needs to see. That single pose should be clear enough, that even without in-between frames the viewer knows exactly what action the character is performing.

![https://media.amano.games/devlog/bouncy-animations/02-bouncy.png](https://media.amano.games/devlog/bouncy-animations/02-bouncy.png)

Another Equally important decision, is choosing which poses you want to emphasize in order to get that reactive feeling when a character interacts with the world. So in the case of Pullfrog, I wanted to really emphasize the jumping part because, well… _frog_.

So I determined that each step pf the jump needed to have an impactful pose. These steps being:

1- Going UP  (Exaggerated stretch pose)

2- Coming Down (Frog curls into a ball)

3- Landing (Super Squash)

A simpler version of this goes into the walk an idle actions. Since I’m working with a n 8x8 grid there’s not a lot of room for detailed poses so the walking cycle is just a body squash and the legs opening and closing in alternation more like a “shimmy” than a walk, but it works!

So it’s not about how many frames I’m using rather, what actions I’m deciding to pose.

All this talk about economizing on frames does not mean that I don’t embellish my animations with extra frames for smoothness. I might if I can afford the sprites and have the extra time. Which is exactly what I chose to do in Pullfrog 2.

![https://media.amano.games/devlog/bouncy-animations/03-bouncy.gif](https://media.amano.games/devlog/bouncy-animations/03-bouncy.gif)

Since the Playdate doesn’t really have any limitations to the amount of sprites, I decided to get a little fancy and add some extra frames to every action. These are just simple in-betweens where I’m using some animation principles like smears and anticipation to convey fluidity in movement. I also don’t want to over animate because this is still a game and reaction times are still more important than animations.

![https://media.amano.games/devlog/bouncy-animations/04-bouncy.gif](https://media.amano.games/devlog/bouncy-animations/04-bouncy.gif)

![https://media.amano.games/devlog/bouncy-animations/09-bouncy.png](https://media.amano.games/devlog/bouncy-animations/09-bouncy.png)

Another advantage I now have is that I'm making the character on a 16x16 grind instead of 8x8 so that gives me a lot more room to really explore the strectchiness of the character.

![https://media.amano.games/devlog/bouncy-animations/05-bouncy.gif](https://media.amano.games/devlog/bouncy-animations/05-bouncy.gif)

![https://media.amano.games/devlog/bouncy-animations/10-bouncy.png](https://media.amano.games/devlog/bouncy-animations/10-bouncy.png)

![https://media.amano.games/devlog/bouncy-animations/06-bouncy.gif](https://media.amano.games/devlog/bouncy-animations/06-bouncy.gif)

![https://media.amano.games/devlog/bouncy-animations/11-bouncy.png](https://media.amano.games/devlog/bouncy-animations/11-bouncy.png)

![https://media.amano.games/devlog/bouncy-animations/07-bouncy.gif](https://media.amano.games/devlog/bouncy-animations/07-bouncy.gif)

![https://media.amano.games/devlog/bouncy-animations/08-bouncy.png](https://media.amano.games/devlog/bouncy-animations/08-bouncy.png)

Anyways. Once we start adding new mechanics and movements I’ll post about them too. And maybe talk about some cheating techniques to convey anticipation without hindering reaction times.

That’s all for now. Thanks For reading!
