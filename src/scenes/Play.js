class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        //tile sprite! used for moving backgrounds as textures
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
        keyFIRE = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.F)
        keyRESET = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.R)
        keyLEFT = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.LEFT)
        keyRIGHT = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.RIGHT)    
    }

    update() {
        this.starfield.tilePositionX -= 4

        this.p1Rocket.update()
    }
}

