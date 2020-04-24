import Phaser from "phaser";

import config from "../const/config";

export default class Ship extends Phaser.GameObjects.Sprite{
    
    myShipConfig = {}; //no hace la asignacion de la variable en el constructor T.T

    constructor(scene,shipConfig) {
        super(
            scene,
            shipConfig.x, 
            shipConfig.y,
            shipConfig.sprite
        ).setScale(2);
        scene.add.existing(this);
        this.play(shipConfig.anim);
        this.setInteractive();
    }

    update(vel){
        this.moveShip(
            this,
            vel
        );
    }

    moveShip(ship,speed){
        ship.y += speed
        if(ship.y>config.height){
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship){
        ship.y = 0;
        var randomX = Phaser.Math.Between(
            0,
            config.width
        );
        ship.x = randomX;
    }
    
}
