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
        this.myShipConfig.scene = scene;
    }

    update(){
        if(this.myShipConfig.isEnable){
            this.moveShip(
                this.myShipConfig.vel
            );
        }
    }

    moveShip(speed){
        this.y += speed
        if(this.y>config.height){
            this.myShipConfig.isEnable = false;
            this.resetShipPos();
            this.myShipConfig.scene.time.addEvent(
                {
                    delay: 5000,
                    callback: function(){
                        this.myShipConfig.isEnable = true;
                    },
                    callbackScope: this,
                    loop: false
                }
            );
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

    getEnableState(){
        return this.myShipConfig.isEnable;
    }

    getDuration(){
        return this.myShipConfig.duration;
    }

    executeExplosion(){
        this.myShipConfig.isEnable = false;
        this.setTexture("explosion");
        this.play("explode");//al ejecutar esta funcion, el cuerpo se hace invisible
    }

    makeVisible(){
        this.myShipConfig.isEnable = true;
        this.setTexture(this.myShipConfig.sprite);
        this.play(this.myShipConfig.anim);
        this.resetShipPos();
        this.setVisible(true);
    }
    
}
