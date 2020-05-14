import Phaser from "phaser";

import config from "../const/config";

export default class GoalScene extends Phaser.Scene {
    
    menuNumber = -1;

    constructor() {
        super("goalScene");
    }

    create() {

        this.background = this.add.tileSprite(
            0,0,
            config.width,
            config.height,
            "background"
        );

        this.background.setOrigin(0,0).setScale(2);
        
        this.jugarBtn = this.add.image(
            config.width*0.5,
            config.height*0.8,
            "jugarBtn"
        ).setInteractive();

        let refScene = this;

        this.jugarBtn.on(
            "pointerdown",
            function(ev){
                refScene.menuNumber = 0;
            }
        );

        this.bePrepare = this.add.bitmapText(
            config.width*0.5-175,
            config.height*0.5, 
            "pixelFont", 
            "Be prepare, enemies are coming",
            32
        );


        this.totalWave = this.add.bitmapText(
            config.width*0.5-120,
            config.height*0.6, 
            "pixelFont", 
            "NEXT WAVE  ---  " + 2000,
            32
        );

    }

    update() {
        switch(this.menuNumber){
            case 0:
                this.scene.start("playGame");
                break;
        }
    }
}