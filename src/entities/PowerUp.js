import Phaser from "phaser";
//todo: crear efectos a los power ups
//agregar mas enemigos
//resetear puntaje en colision
//colocar contador de vidas
//aumentar la velocidad a medida que pasa el tiempo
//colocar enemigos que devuelven los proyectiles
//agregar colision de proyectiles con el player

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
    }

    update(){
        this.moveShip(
            this.mypowerUpConfig.vel
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

    executeEffect(){
        //put another animation later
        //this.setTexture("explosion");
        //this.play("explode");
        this.setVisible(false);
    }

    makeVisible(){
        this.setTexture(this.mypowerUpConfig.sprite);
        this.play(this.mypowerUpConfig.anim);
        this.resetShipPos();
        this.setVisible(true);
    }
}
