class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
      // load audio
      this.load.audio('sfx_select', './assets/honk_select.wav');
      this.load.audio('sfx_explosion', './assets/dart_hit.wav');
      this.load.audio('sfx_rocket', './assets/dart_throw.wav');
    }
    
    create() {
      let menuConfig = {
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

      //show Menu Text:
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'LIKE SHOOTING FISH AT A CARNIVAL!', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#220019';
      menuConfig.color = '#efbbcc ';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press [<--] for BABY mode or [-->] for BIG KID mode', menuConfig).setOrigin(0.5);
      
      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          pieSpeed: 5,
          gameTimer: 60000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
          spaceshipSpeed: 4,
          pieSpeed: 6,
          gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
    }
  }