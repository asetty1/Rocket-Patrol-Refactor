class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        //add to scene
        scene.add.existing(this)

        //track rocket's firing
        this.isFiring = false

        //rocket speed in pixels/frame
        this.moveSpeed = 2

        this.sfxShot = scene.sound.add('sfx-shot')

        //adding text for FIRE
        this.fireText = scene.add.text(game.config.width / 2, borderUISize * 2 + borderPadding, 'FIRE', {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#00FF00',
            align: 'center'
        }).setOrigin(0.5, 0.5).setVisible(false)
    }

    update() {
        
        // if (this.x < borderUISize + this.width / 2) {
        //     this.x = borderUISize + this.width / 2
        // } else if (this.x > game.config.width - borderUISize - this.width / 2) {
        //     this.x = game.config.width - borderUISize - this.width / 2
        // }

        //left and right movement!!!
        if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed
        }

        //mouse movement
        let pointer = this.scene.input.activePointer
        if (!keyLEFT.isDown && !keyRIGHT.isDown) {
            if (this.scene.input.activePointer.x >= borderUISize + this.width / 2 && this.scene.input.activePointer.x <= game.config.width - borderUISize - this.width / 2) {
                this.x = this.scene.input.activePointer.x
            }
        }

        //to fire button
        if((Phaser.Input.Keyboard.JustDown(keyFIRE) || this.scene.input.activePointer.isDown) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }

        //once fired move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
            this.fireText.setVisible(true)
        }

        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.scene.checkMiss()  // Call the scene's checkMiss method
            this.reset()

        }

    }

    reset () {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
        this.fireText.setVisible(false)
    }

}