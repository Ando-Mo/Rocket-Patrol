class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images
        this.load.image('dart', './assets/dart.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spacePie', './assets/spacePie.png');

        this.load.spritesheet('spaceship_idle', './assets/fish-idle.png', {frameWidth: 29, frameHeight: 13, startFrame: 0, endFrame: 1});

        this.load.spritesheet('clown_throw', './assets/clown_throw.png', {frameWidth: 92, frameHeight: 79, startFrame: 0, endFrame: 1}); 

        this.load.spritesheet('explosion', './assets/fish-explode.png', {frameWidth: 44, frameHeight: 36, startFrame: 0, endFrame: 2});

        this.load.spritesheet('pie_explosion', './assets/pie_explode.png', {frameWidth: 31, frameHeight: 37, startFrame: 0, endFrame: 3});

        this.load.image('starfield', './assets/mock-up.png');
    }

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0, -30, 640, 480, 'starfield').setOrigin(0,0);

        //add spaceships of varying point values & positions: 
        this.ship01 = new Spaceship(this, game.config.width, borderUISize*6 + borderUISize*4, 'spaceship_idle', 0, 10);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship_idle', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship_idle', 0, 10).setOrigin(0,0);
        
        //add spacePie
        this.pie01 = new SpacePie(this, game.config.width + borderUISize*6, borderUISize*4, 'spacePie', 9, 30).setOrigin(0,0 ).setOrigin(0,0);

        //reconifigure size and shape of spaceships (fish)
        let shipSize = 1.5;
        this.ship01.scale *= shipSize;
        this.ship01.width *= shipSize;
        this.ship01.height *= shipSize;

        this.ship02.scale *= shipSize;
        this.ship02.width *= shipSize;
        this.ship02.height *= shipSize;

        this.ship03.scale *= shipSize;
        this.ship03.width *= shipSize;
        this.ship03.height *= shipSize;

         //white border
         this.add.rectangle(0,0,game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
         this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
 
         this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
         this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
         //add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'dart').setOrigin(0.5, 0);

        //reconifigure size and shape of spaceships (fish)
        let rocketSize = 1.5;
        this.p1Rocket.scale *= rocketSize;
        this.p1Rocket.width *= rocketSize;
        this.p1Rocket.height *= rocketSize;

        //add clown
        this.clown01 = new Clown(this, game.config.width - borderUISize*3, borderUISize*6, 'clown_throw', 1).setOrigin(0.25,0.25); 

        //reconfigure clown size
        let clownSize = 1.3;
        this.clown01.scale *= clownSize;
        this.clown01.width *= clownSize;
        this.clown01.height *= clownSize;

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
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 2, first: 0}), 
            frameRate: 8
        });

        this.anims.create({
            key: 'pie_explode',
            frames: this.anims.generateFrameNumbers('pie_explosion', {start: 0, end: 3, first: 0}), 
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
            fontFamily: 'VastShadow-Regular',
            fontSize: '28px',
            backgroundColor: '#fffaf0 ',
            color: '#f9346c',
            align: 'right',
            padding:{
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        

        //GAME OVER FLAG:
        this.gameOver = false;

        //60 second play clock
        scoreConfig.fixedWidth = 0; 
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'Nice shooting!', scoreConfig).setOrigin(0.5); 
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);


        //countdown timer event
        scoreConfig.color = '#000000';
        scoreConfig.backgroundColor = '#55AA80';
        this.timer = this.add.text(game.config.width - borderUISize*3, borderUISize + borderPadding*2, this.clock.getRemainingSeconds(), scoreConfig);
    }

    update(){
        //timer gets updated with rounded value
        this.timer.setText(parseInt(this.clock.getRemainingSeconds()));
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //this.starfield.tilePositionX -= 4;
        
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.pie01.update();
        }
        
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.pie01)){
            console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.pieExplode(this.pie01);
        }
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
        this.getThrown(this.pie01);

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
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0.2,0.2);
        boom.scale *= 1.5;
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

    pieExplode(ship){
        //temporarily hide ship
        ship.alpha = 0; 
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'pie_explosion').setOrigin(0.2,0.2);
        boom.scale *= 1.5;
        boom.anims.play('pie_explode'); //play explode animation
        boom.on('animationcomplete', () => { //callback after animation completes
            ship.reset(); //reset ship position
            boom.destroy(); //remove explosion sprite
        });
        //score add & repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //explosion sfx
        this.sound.play('sfx_select');
    }
    
}