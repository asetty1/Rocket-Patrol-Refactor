/*
Ananya Setty
Rocket Patrol: ------------------------------
the approximate time it took to complete the project (in hours)

1pt: 
- Added "FIRE" text to appear at the top of the game when rocket is firing
    - created new text in Rocket.js and used isFiring to control visibiltiy
- Allowing for Left and Right movement control while the rocket is firing
    - removed !isFiring condition
- Speed increases after 30 seconds along with "Speed Increase" text
    - added speed property in game settings along with delay timing
    - used variable assignments to change speed
- Created a new background sprite as well as a scrolling tileSprite on top
    - drew two new assests on piskel and preloaded them before using sprite and tileSprite

3pt:
- Created a spritesheet for the enemy spaceships
    - used piskel to create spritesheet and anims for animations
- Displayed the remaining time in seconds on the game screen
    - added some basic timer code plus a new text config to display it on the screen
    - used math.floor to get a flat number

5pt:
- Added mouse control and click for fire
    - used active pointer and had it called when keys are not being pressed down
    - added OR condition for firing
- Created two new spaceships that are smaller and faster that are worth more points
    - created spritesheets for spaceships and explosions on piskel
    - created separate config for smaller spaceships
    - trial and error to get right spacing and have them appear between the bigger spaceships
    - resued code for collision, explosion, and reset
- Added a new timing mechanism that adds time for hits and removes for misses
    - dealt with timer.delay
    - created a new checkMiss function to call if rocket reaches the top of the game screen
    - updated rocket.js to call checkMiss() before resetting the rocket (took me 2 hours to figure out why my reset and time was wrong it was very annoying)

*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}



let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT


let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
