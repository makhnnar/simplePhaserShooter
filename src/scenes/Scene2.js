import Phaser from "phaser";

import Beam from "./Beam"

import Ship from "./Ship";

import Player from "./Player";

import config from "../const/config";


export default class Scene2 extends Phaser.Scene{
    
    constructor(){
        super("playGame");
    }

    create(){
        this.background = this.add.tileSprite(
            0,0,
            config.width,
            config.height,
            "background"
        );
        this.background.setOrigin(0,0).setScale(2);
        /*this.add.text(
            20,20,
            "Playing game",
            {font:"25px Arial",fill:"yellow"}
        );*/

        const shipConfig1 = {
            x : config.width / 2 - 50,
            y : config.height / 2,
            sprite : "ship1",
            anim : "ship1_anim",
            vel : 1
        }
        const shipConfig2 = {
            x : config.width / 2,
            y : config.height / 2,
            sprite : "ship2",
            anim : "ship2_anim",
            vel : 2
        }
        const shipConfig3 = {
            x : config.width / 2 + 50,
            y : config.height / 2,
            sprite : "ship3",
            anim : "ship3_anim",
            vel : 3
        }

        this.ship1 = new Ship(this,shipConfig1);
        this.ship2 = new Ship(this,shipConfig2);
        this.ship3 = new Ship(this,shipConfig3);

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.powerUps = this.physics.add.group();

        // 2.2 Add multiple objects
        var maxObjects = 4;
        for (var i = 0; i <= maxObjects; i++) {
            var powerUp = this.physics.add.sprite(16, 16, "powerUp");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(
                0, 
                0,
                config.width,
                config.height
            );

            // set random animation
            if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray");
            }

            // setVelocity
            powerUp.setVelocity(100, 100);
            // 3.2
            powerUp.setCollideWorldBounds(true);
            // 3.3
            powerUp.setBounce(1);

        }

        //this.ship1.setInteractive();
        //this.ship2.setInteractive();
        //this.ship3.setInteractive();

        this.input.on(
            'gameobjectdown',
            this.destroyShip,
            this
        );

        const playerConfig = {
            x : config.width / 2 - 8,
            y : config.height -64,
            sprite : "player",
            anim : "thrust",
            vel : 3
        }
        this.player = new Player(this,playerConfig);
        //this.player.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.physics.add.collider(
            this.projectiles,
            this.powerUps,
            function(projectile,powerUp){
                projectile.destroy();
            }
        );

        this.physics.add.overlap(
            this.player,
            this.powerUps,
            this.pickUpPower,
            null,
            this
        );

        this.physics.add.overlap(
            this.projectiles,
            this.enemies,
            this.destroyEnemy,
            null,
            this
        );
    }

    update(){
        this.background.tilePositionY -= 0.5;
        this.player.movePlayerManager(this.cursorKeys);
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.shootBeam();
        }
        this.enemies
            .getChildren()
            .forEach(
                (enemy) => {
                    enemy.update();
                }
            );
        this.projectiles
            .getChildren()
            .forEach(
                (beam) => {
                    beam.update();
                }
            );
    }

    shootBeam(){
        var beam = new Beam(this);
    }
    
    destroyShip(pointer,gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    destroyEnemy(projectile,enemy){
        projectile.destroy();
        enemy.executeExplosion();
        setTimeout(
            function(){
                enemy.makeVisible();
            }, 
            1000
        );
    }

    pickUpPower(player,powerUp){
        powerUp.disableBody(true,true);
    }

};
