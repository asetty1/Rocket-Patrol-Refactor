
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = speed || game.settings.initialSpaceshipSpeed
        //console.log('Spaceship Initial Speed:', this.moveSpeed)
    }

    update() {
        //this.moveSpeed = game.settings.spaceshipSpeed
        //console.log('Spaceship Updated Speed:', this.moveSpeed)

        //moving spaceship to the left
        this.x -= this.moveSpeed

        //wrapping across the screen
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }

    reset() {
        this.x = game.config.width
    }
}