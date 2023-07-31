---
title: 'This kills the frog'
excerpt: 'After rewriting the physics system for the third time, it was time to start working on more fun stuff. The frog death system™.'
tags: collisions,gamedev,playdate,pullfrog
date: 2021/09/02
publish: true
author:
  name: Mario
  url: 'https://merveilles.town/@mario_afk'
cover:
  url: 'https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/ded.gif'
---

Remember when I said that making a hole inside a big collider was a good idea? It was not. After rewriting the physics system for the third time, it was time to start working on more fun stuff. The frog death system™.

Something we wanted to improve from the PICO-8 version of the game, was to make it harder for the player to die. The game can be hard, as you need to mix platforming with puzzle solving abilities.

On top of that, dying while pulling the pieces towards you was no fun, so we came up with a system to try to save you, moving you out of danger.

First we figured we only are going to try to save the frog if you are getting squished by a piece that is moving vertically.

The most important part is to figure out which direction we should move you. Our first approach was to compare the piece center with the player center, and move the player to the closest side to freedom.

```lua
    -- Fake code
    local pieceCenter = piece:getCenter()
    local playerCenter = player:getCenter()

    if playerCenter < pieceCenter then
        player:moveLeft()
    else
        player:moveRight()
    end
```

This simple solution had a small problem, our pieces have different shapes and the center is not always, well, in the center.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/hand-picked-center%281%29.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/hand-picked-center%281%29.png)

So we created a small system to place the center of the pieces _by hand_

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/automatic-center%281%29.png](https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/automatic-center%281%29.png)

Now we have to figure out how many pixels we want the system to move the player each frame. If we move it too much, it would look like we are teleporting the player. If we move it too little, then it can get stuck for many frames and look like the game broke.

We decided we didn't want the player to die until the very last moment. When the piece is squishing it so much that there is no room to escape.

We can get this information based on the overlapping rect between the piece and the player. If the `height` of the rect is less than 10 pixels (the frog collider is 11 pixels tall), we keep trying to break you free.

We figured that 1 pixel at a time would look the best most of the time. There are some times when you are on top of a piece that's falling and if you pull it towards you, you get stuck sliding between a piece sandwich. So in that specific case, we move you 2 pixels at a time to get you out faster.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/slide.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/slide.gif)

Another thing we realized was that it didn't feel good when you died while you were moving in one direction, and our system forced you to move in the opposite direction.

You would still be dead if we moved the direction you were trying to move. But it felt unfair because we were forcing you to move in to a direction you didn't intend.

So now if you press any of the D-PAD arrows while being squished, we force the direction you are pressing to try to get you out. You die more times than before, but it always feels like it's your fault, not the game's fault.

After implementing this, we found another issue. If you stopped pressing the D-PAD after we started moving you, then our system would try to move you in the opposite direction if you hadn't cleared the piece center.

This looked bad as the character was moving without you controlling it in random looking directions.

We decided to save the D-PAD direction if you were pressing it while being squished and try to save you on that direction even if you stopped pressing it.

Sometimes you would only get squished by a small amount on one of the player corners. If you were moving in to the piece and get caught, then our system would pull you in and kill you without anything you could do about it.

We added another rule. If the piece is crushing you by only a small amount, then we try to move you in the closest direction to freedom, regardless of what you are pressing.

Finally, if we fail to save you and the intersection rect between the piece and the frog is taller than 10pixels. This kills the frog.

![https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/ded.gif](https://amano-media.nyc3.digitaloceanspaces.com/devlog/this-kills-the-frog/ded.gif)

Here is the code we ended up having, there is a lot of context missing, but helps to understand the system a little better.

---

```lua
function Player:SquishY(other, x, y, w, h, dy)
    local px = self.x
    local ox, oy = table.unpack(other.overrideCenter)
    ox, oy = other.x + ox, other.y + oy
    local dirX = self.flip and 1 or -1
    local correctingDir = self.correctingDir
    local velX = self.velocity.x

    local sideDist = 8
    local maxSquish = 10
    local speed = 1
    local cornerThreshold = 4
    local speedThreshold = 0.4

    if other.targetPosition then speed = 2 end
    -- When you get squish from a piece that it's moving upwards,
    -- check if there is a solid on top of you and if there is
    -- this kills the frog
    if dy < 0 then if self:checkSolid(0, -1) then return self:die() end end

    -- The player always overrides the direction where you are going
    -- to be tried to be saved.
    -- If the player stops pressing a button we use the last direction
    -- the user pressed.
    if (input.btn("left") or velX < -speedThreshold) and w >
        cornerThreshold then
        dirX = -1
        self.correctingDir = dirX
    elseif (input.btn("right") or velX > speedThreshold) and w >
        cornerThreshold then
        dirX = 1
        self.correctingDir = dirX
    else
        if correctingDir == nil then
            if (px < ox) then
                dirX = -1
            elseif (px > ox) then
                dirX = 1
            end
        else
            dirX = correctingDir
        end
    end

    if h <= maxSquish then
        actorCornerCorrect(self, dirX * speed, 0, sideDist, {0})
        self.squishedY = true
    else
        self:die()
    end
end
```
