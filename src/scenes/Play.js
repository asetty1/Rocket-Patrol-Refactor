class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        //tile sprite! used for moving backgrounds as textures
        this.starfieldbg = this.add.sprite(0, 0, 'starfieldbg').setOrigin(0, 0)
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        //background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0) 
            
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
    
        //adding in the rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
    
        //define keys and keyboard movement
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //mouse movement
        this.input.mouse.capture = true
    
        // adding THREE spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'newspaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*4, borderUISize*6 + borderPadding*2, 'newspaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*4, 'newspaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0,0)
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*5, borderUISize*6 + borderPadding*6, 'fastShip', 0, 40, game.settings.fastSpaceshipSpeed).setOrigin(0,0)
        this.ship05 = new Spaceship(this, game.config.width + borderUISize*2, borderUISize*3 + borderPadding*6, 'fastShip', 0, 40, game.settings.fastSpaceshipSpeed).setOrigin(0,0)


        this.ship01.play('spaceship2')
        this.ship02.play('spaceship2')
        this.ship03.play('spaceship2')
        this.ship04.play('fastShip')
        this.ship05.play('fastShip')

        this.p1Score = 0

        //displaying the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        
        //timer code
        this.timer = this.time.addEvent ({
            delay: game.settings.gameTimer,
            callback: this.endGame,
            callbackScope: this
        })

        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.speedIncreaseText = this.add.text(game.config.width / 2, game.config.height / 2, 'Speed Increase!', {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 300
        }).setOrigin(0.5).setVisible(false)

        this.timerText = this.add.text(game.config.width - borderUISize - borderPadding - 120, borderUISize + borderPadding*2, Math.floor(this.timer.getRemainingSeconds()), timerConfig)

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        //game over flag
        this.gameOver = false

        //timer 60 seconds
        scoreConfig.fixedWidth = 0

        game.settings.spaceshipSpeed = game.settings.initialSpaceshipSpeed
        //console.log('The speed initially is:', game.settings.spaceshipSpeed)

        //timer
        this.time.delayedCall(game.settings.increaseTime, () => {
            game.settings.spaceshipSpeed = game.settings.increasedSpaceshipSpeed
            //console.log('Spaceship spped is now:', game.settings.spaceshipSpeed)

            this.speedIncreaseText.setVisible(true)
            this.time.delayedCall(1000, () => {
                this.speedIncreaseText.setVisible(false)
            }, [], this)
        }, [], this)

    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4

        if(!this.gameOver) {
            this.p1Rocket.update()

            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
            this.ship05.update()

            this.timerText.setText(Math.floor(this.timer.getRemainingSeconds()))
        }

        this.p1Rocket.update()

        let collisionOccurred = false

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            console.log('KABOOM SHIP 03')
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            collisionOccurred = true
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            console.log('KABOOM SHIP 02')
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            collisionOccurred = true
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            console.log('KABOOM SHIP 01')
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            collisionOccurred = true
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            console.log('KABOOM SHIP 04')
            this.p1Rocket.reset()
            this.fastShipExplode(this.ship04)
            collisionOccurred = true
        }
        if(this.checkCollision(this.p1Rocket, this.ship05)) {
            console.log('KABOOM SHIP 05')
            this.p1Rocket.reset()
            this.fastShipExplode(this.ship05)
            collisionOccurred = true
        }



    }

    checkCollision(rocket, ship) {
        //this checks for AABB (Axis Aligned Bounding Boxes) for overlap to imply collision
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
            }
        
    }

    checkMiss() {
        if (this.p1Rocket.y <= (borderUISize * 3 + borderPadding)) {
            this.timer.delay -= 5000
            this.timerText.setText(Math.floor(this.timer.getRemainingSeconds()))
            console.log('Rocket missed all targets')
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })     
        
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        this.timer.delay += 5000

        this.timerText.setText(Math.floor(this.timer.getRemainingSeconds()))

        this.sound.play('sfx-explosion')
    }

    fastShipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'fastExplosion').setOrigin(0, 0);
        boom.anims.play('fastExplosion')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })     
        
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        this.timer.delay += 5000

        this.timerText.setText(Math.floor(this.timer.getRemainingSeconds()))

        this.sound.play('sfx-explosion')
    }


    endGame() {
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
        this.gameOver = true

    }
}

