let config = {
    type: Phaser.AUTO,
    width: 640, 
    height: 480, 
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//set UI sizes, ok? 
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//reserve keyboard variables: 
let keyF, keyR, keyLEFT, keyRIGHT;


//CHANGES:

//increased rocket speed
//changed Rocket asset to be a dart 
//changed Spaceships to be animated fish