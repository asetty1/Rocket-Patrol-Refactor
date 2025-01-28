class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('starfieldbg', './assets/starfield_bg.png')
        this.load.spritesheet('explosion', './assets/explosion2.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 18
        })
        this.load.spritesheet('newspaceship', './assets/spaceship_spritesheet.png', {
            frameWidth: 90,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        this.load.spritesheet('fastShip', './assets/fast_spaceship.png', {
            frameWidth: 45,
            frameHeight: 27,
            startFrame: 0,
            endFrame: 6
        })
        this.load.spritesheet('fastExplosion', './assets/fastExplosion.png', {
            frameWidth: 45,
            frameHeight: 27,
            startFrame: 0,
            endFrame: 13
        })
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }


    create() {

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0, 
                end: 18, 
                first: 0}),
            frameRate: 20
        })

        this.anims.create({
            key: 'spaceship2',
            frames: this.anims.generateFrameNumbers('newspaceship', {
                start: 0, 
                end: 2, 
                first: 0}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'fastShip',
            frames: this.anims.generateFrameNumbers('fastShip', {
                start: 0, 
                end: 6, 
                first: 0}),
            frameRate: 7,
            repeat: -1
        })
        this.anims.create({
            key: 'fastExplosion',
            frames: this.anims.generateFrameNumbers('fastExplosion', {
                start: 0, 
                end: 13, 
                first: 0}),
            frameRate: 20
        })
        //this.add.text(20, 20, "Rocket Patrol Menu")
        //this.scene.start("playScene")

        let menuCongif = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuCongif).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuCongif).setOrigin(0.5)
        menuCongif.backgroundColor = '#00FF00'
        menuCongif.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuCongif).setOrigin(0.5)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                initialSpaceshipSpeed: 3,
                increasedSpaceshipSpeed: 7,
                fastSpaceshipSpeed: 10,
                increaseTime: 30000,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start("playScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //easy mode
            game.settings = {
                initialSpaceshipSpeed: 4,
                increasedSpaceshipSpeed: 8,
                fastSpaceshipSpeed: 15,
                increaseTime: 30000,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start("playScene")
        }
    }
}

