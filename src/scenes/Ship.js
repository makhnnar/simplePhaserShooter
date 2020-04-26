import Phaser from "phaser";

import config from "../const/config";

export default class Ship extends Phaser.GameObjects.Sprite{
    
    myShipConfig = {};

    constructor(scene,shipConfig) {
        super(
            scene,
            shipConfig.x, 
            shipConfig.y,
            shipConfig.sprite
        ).setScale(2);
        this.myShipConfig = shipConfig;
        scene.add.existing(this);
        this.play(shipConfig.anim);
        this.setInteractive();
    }

    update(){
        this.moveShip(
            this.myShipConfig.vel
        );
    }

    moveShip(speed){
        this.y += speed
        if(this.y>config.height){
            this.resetShipPos();
        }
    }

    resetShipPos(){
        this.y = 0;
        var randomX = Phaser.Math.Between(
            0,
            config.width
        );
        this.x = randomX;
    }

    executeExplosion(){
        this.setTexture("explosion");
        this.play("explode");
    }

    makeVisible(){
        this.setTexture(this.myShipConfig.sprite);
        this.play(this.myShipConfig.anim);
        this.resetShipPos();
        this.setVisible(true);
    }
    
}
