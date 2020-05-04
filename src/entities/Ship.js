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
        );
        this.myShipConfig = shipConfig;
        scene.add.existing(this);
        this.play(shipConfig.anim);
        //necesario para agregarle fisicas
        scene.physics.world.enableBody(this);
        //necesario para que detecte los limites de la scena
        //no aplicable ya que el objeto debe desaparecer al llegar abajo
        //this.body.collideWorldBounds = true;
        //this.setInteractive();
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

    getVisibleState(){
        return this.visible;
    }

    executeExplosion(){
        this.setTexture("explosion");
        this.play("explode");//al ejecutar esta funcion, el cuerpo se hace invisible
    }

    makeVisible(){
        this.setTexture(this.myShipConfig.sprite);
        this.play(this.myShipConfig.anim);
        this.resetShipPos();
        this.setVisible(true);
    }
    
}
