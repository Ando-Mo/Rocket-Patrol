//SpacePie prefab
class SpacePie extends Spaceship{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame, pointValue);
        //this.moveSpeed = game.settings.pieSpeed;
    }

    // update(){
    //     //move spaceship left: 
    //     this.x -= this.moveSpeed;
    //     //wrap around from left edge to right edge
    //     if(this.x <= 0 - this.width){
    //         this.x = game.config.width;
    //         this.alpha = 0;
    //     }
    // }

    //reset position
    reset(){
        this.x = game.config.width;
        this.alpha = 0;
    }
}