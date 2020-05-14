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
        
        var jugarBtn = this.add.image(
            config.width*0.5,
            config.height*0.8,
            "jugarBtn"
        ).setInteractive();

        //this.menuNumber = -1;

        var refScene = this;

        jugarBtn.on(
            "pointerdown",
            function(ev){
                refScene.menuNumber = 0;
            }
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