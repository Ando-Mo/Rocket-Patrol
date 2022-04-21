class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images
        this.load.image('dart', './assets/dart.png');
        this.load.image('spaceship', './assets/spaceship.png');

        this.load.spritesheet('spaceship_idle', './assets/fish-idle.png', {frameWidth: 29, frameHeight: 13, startFrame: 0, endFrame: 1});

        this.load.spritesheet('clown_throw', './assets/clown_throw.png', {frameWidth: 92, frameHeight: 79, startFrame: 0, endFrame: 1}); 

        this.load.spritesheet('explosion', './assets/fish-idle.png', {frameWidth: 29, frameHeight: 13, startFrame: 0, endFrame: 1});
        

        this.load.image('starfield', './assets/starfield.png');
    }

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        //green UI 
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)

        //add spaceships of varying point values & positions: 
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship_idle', 9, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship_idle', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship_idle', 0, 10).setOrigin(0,0);

        //reconifigure size and shape of spaceships (fish)
        this.ship01.scale *= 1.5;
        this.ship01.width *= 1.5;
        this.ship01.height *= 1.5;

        this.ship02.scale *= 1.5;
        this.ship02.width *= 1.5;
        this.ship02.height *= 1.5;

        this.ship03.scale *= 1.5;
        this.ship03.width *= 1.5;
        this.ship03.height *= 1.5;

         //white border
         this.add.rectangle(0,0,game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
 
         this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
         this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'dart').setOrigin(0.5, 0);

        //add clown
        this.clown01 = new Clown(this, game.config.width - borderUISize*3, borderUISize*6, 'clown_throw', 1).setOrigin(0.25,0.25); 

        //reconfigure clown size
        this.clown01.scale *= 1.1;
        this.clown01.width *= 1.1;
        this.clown01.height *= 1.1;

        //define keys: 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config:
        this.anims.create({ 
            key: 'spaceship_idle',
            frames: this.anims.generateFrameNumbers('spaceship_idle', {start: 0, end: 1, first: 0}), 
            frameRate: 8, 
            repeat: -1
        });
        
        this.anims.create({ 
            key: 'clown_throw',
            frames: this.anims.generateFrameNumbers('clown_throw', {start: 0, end: 1, first: 0}), 
            frameRate: 4, 
            repeat: -1
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 1, first: 0}), 
            frameRate: 10
        });

        //play the spaceship's looping animations
        this.ship01.anims.play(('spaceship_idle'));
        this.ship02.anims.play(('spaceship_idle'));
        this.ship03.anims.play(('spaceship_idle'));

        //play clown's looping animation
        this.clown01.anims.play(('clown_throw'));

        //init score
        this.p1Score = 0;
        //display score
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
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        //GAME OVER FLAG:
        this.gameOver = false;

        //60 second play clock
        scoreConfig.fixedWidth = 0; 
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5); 
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        this.getThrown(this.ship01);
        this.getThrown(this.ship02);
        this.getThrown(this.ship03);

    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            }
        else{
            return false;
        }
    }
    getThrown(ship){
        //input a ship, and see if the clown needs to be moved to that position
        if(ship.x == game.config.width - borderUISize*3){
            this.clown01.x = ship.x; 
            this.clown01.y = ship.y;
            ship.alpha = 1;
        }
    }
    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0; 
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); //play explode animation
        boom.on('animationcomplete', () => { //callback after animation completes
            ship.reset(); //reset ship position
            boom.destroy(); //remove explosion sprite
        });
        //score add & repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //explosion sfx
        this.sound.play('sfx_explosion');
    }
}