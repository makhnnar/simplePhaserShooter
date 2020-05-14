import Phaser from "phaser";

import config from "../const/config";

export default class PowerUp extends Phaser.GameObjects.Sprite{

    mypowerUpConfig = {};

    constructor(scene,powerUpConfig) {
        super(
            scene,
            powerUpConfig.x, 
            powerUpConfig.y,
            powerUpConfig.sprite
        );
        this.mypowerUpConfig = powerUpConfig;
        scene.add.existing(this);
        this.play(powerUpConfig.anim);
        scene.physics.world.enableBody(this);
        this.mypowerUpConfig.scene = scene;
    }

    update(){
        if(this.mypowerUpConfig.isEnable){
            this.moveShip(
                this.mypowerUpConfig.vel
            );
        }
    }

    moveShip(speed){
        this.y += speed
        if(this.y>config.height){
            this.mypowerUpConfig.isEnable = false;
            this.resetShipPos();
            this.mypowerUpConfig.scene.time.addEvent(
                {
                    delay: 5000,
                    callback: function(){
                        this.mypowerUpConfig.isEnable = true;
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

    getVisibleState(){
        return this.visible;
    }

    getPoints(){
        return this.mypowerUpConfig.points;
    }

    getDuration(){
        return this.mypowerUpConfig.duration;
    }

    getEnableState(){
        return this.mypowerUpConfig.isEnable;
    }

    getShootQuanty(){
        return this.mypowerUpConfig.shootQuanty;
    }

    //todo: change name, this is not aplaying any name
    executeEffect(){
        //put another animation later
        //this.setTexture("explosion");
        //this.play("explode");
        this.mypowerUpConfig.isEnable = false;
        this.setVisible(false);
    }

    makeVisible(){
        this.mypowerUpConfig.isEnable = true;
        this.setTexture(this.mypowerUpConfig.sprite);
        this.play(this.mypowerUpConfig.anim);
        this.resetShipPos();
        this.setVisible(true);
    }
}
