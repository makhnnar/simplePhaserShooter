import Phaser from "phaser";

export default class Scene1 extends Phaser.Scene{
    
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image(
            "background",
            "src/assets/images/background.png"
        );
        this.load.image(
            "jugarBtn",
            "src/assets/images/jugarBtn.png"
        );
        this.load.spritesheet(
            "ship1",
            "src/assets/spritesheets/ship.png",
            {
                frameWidth:16,
                frameHeight:16
            }
        );
        this.load.spritesheet(
            "ship2",
            "src/assets/spritesheets/ship2.png",
            {
                frameWidth:32,
                frameHeight:16
            }
        );
        this.load.spritesheet(
            "ship3",
            "src/assets/spritesheets/ship3.png",
            {
                frameWidth:32,
                frameHeight:32
            }
        );
        this.load.spritesheet(
            "explosion",
            "src/assets/spritesheets/explosion.png",
            {
                frameWidth:16,
                frameHeight:16
            }
        );
        this.load.spritesheet(
            "powerUp",
            "src/assets/spritesheets/power-up.png",
            {
                frameWidth:16,
                frameHeight:16
            }
        );
        this.load.spritesheet(
            "player",
            "src/assets/spritesheets/player.png",
            {
                frameWidth:16,
                frameHeight:24
            }
        );
        this.load.spritesheet(
            "beam",
            "src/assets/spritesheets/beam.png",
            {
                frameWidth:16,
                frameHeight:16
            }
        );
        this.load.bitmapFont(
            "pixelFont",
            "src/assets/font/font.png",
            "src/assets/font/font.xml"
        );

    }

    create(){
        //this.add.text(20,20,"Loading gamesrc.");
        this.scene.start("goalScene");

        this.anims.create({
            key:"ship1_anim",
            frames:this.anims.generateFrameNumbers("ship1"),
            frameRate:20,
            repeat:-1
        });
        this.anims.create({
            key:"ship2_anim",
            frames:this.anims.generateFrameNumbers("ship2"),
            frameRate:20,
            repeat:-1
        });
        this.anims.create({
            key:"ship3_anim",
            frames:this.anims.generateFrameNumbers("ship3"),
            frameRate:20,
            repeat:-1
        });
        this.anims.create({
            key:"explode",
            frames:this.anims.generateFrameNumbers("explosion"),
            frameRate:20,
            repeat:0,
            hideOnComplete:true
        });

        this.anims.create({
            key:"red",
            frames:this.anims.generateFrameNumbers(
                "powerUp",
                {
                    start:0,
                    end:1
                }
            ),
            frameRate:20,
            repeat:-1
        });
        this.anims.create({
            key:"gray",
            frames:this.anims.generateFrameNumbers(
                "powerUp",
                {
                    start:2,
                    end:3
                }
            ),
            frameRate:20,
            repeat:-1
        });

        this.anims.create({
            key:"thrust",
            frames:this.anims.generateFrameNumbers("player"),
            frameRate:20,
            repeat:-1
        });

        this.anims.create({
            key:"beam_anim",
            frames:this.anims.generateFrameNumbers("beam"),
            frameRate:20,
            repeat:-1
        });

    }

}
