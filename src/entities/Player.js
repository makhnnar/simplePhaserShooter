import Phaser from "phaser";

import gameSettings from "../const/gameSettings";

export default class Player extends Phaser.GameObjects.Sprite{
    
    myPlayerConfig = {};

    constructor(scene,playerConfig) {
        super(
            scene,
            playerConfig.x, 
            playerConfig.y,
            playerConfig.sprite
        );
        this.myPlayerConfig = playerConfig;
        this.play(playerConfig.anim);
        scene.add.existing(this);
        //necesario para agregarle fisicas
        scene.physics.world.enableBody(this);
        //necesario para que detecte los limites de la scena
        this.body.collideWorldBounds = true;
        //this.displayHeight = 64;//con estas propiedades puedo cambiar el tamaño del sprite y mantener las colisiones funcionando
        //this.displayWidth = 38;
    }

    movePlayerManager(cursorKeys){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        if(cursorKeys.left.isDown){
            this.body.velocity.x = -gameSettings.playerSpeed;
        }else if(cursorKeys.right.isDown){
            this.body.velocity.x = gameSettings.playerSpeed;
        }
        if(cursorKeys.up.isDown){
            this.body.velocity.y = -gameSettings.playerSpeed;
        }else if(cursorKeys.down.isDown){
            this.body.velocity.y = gameSettings.playerSpeed;
        }
    }
    
    getEnableState(){
        return this.myPlayerConfig.isEnable;
    }


    executeExplosion(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.myPlayerConfig.isEnable = false;
        this.setTexture("explosion");
        this.play("explode");//al ejecutar esta funcion, el cuerpo se hace invisible
    }

    makeVisible(){
        this.myPlayerConfig.isEnable = true;
        this.setTexture(this.myPlayerConfig.sprite);
        this.play(this.myPlayerConfig.anim);
        this.resetShipPos();
        this.setVisible(true);
    }

}
