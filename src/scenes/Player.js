import Phaser from "phaser";

import gameSettings from "../const/gameSettings";

export default class Player extends Phaser.GameObjects.Sprite{
    
    myPlayerConfig = {};

    //esto funciona, pero tiene problemas definiendo lo bordes del objeto

    constructor(scene,playerConfig) {
        super(
            scene,
            playerConfig.x, 
            playerConfig.y,
            playerConfig.sprite
        ).setScale(2);
        this.myPlayerConfig = playerConfig;
        this.play(playerConfig.anim);
        scene.add.existing(this);
        //necesario para agregarle fisicas
        scene.physics.world.enableBody(this);
        //necesario para que detecte los limites de la scena
        this.body.collideWorldBounds = true;
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
    
}
