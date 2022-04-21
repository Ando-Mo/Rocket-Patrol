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


//Name: Andrew Mangal, Project Title: Shooting Fish in a Carnival, Date: 4/21, Length: 10 hours

//Points Breakdown: 
//60 points for the redesigning of all sound, UI, and art to fit to a specific theme (ie: Circus themed)
//20 points for the new Pie enemy, which is smaller, worth more points, and moves faster than the rest.
//10 points for the animated fish enemy (or even the animated clown, if you wanted to consider him an enemy-- there's at least two new loop animated objects)
//10 points for the timer on the top right hand corner that counts down from 60 seconds.