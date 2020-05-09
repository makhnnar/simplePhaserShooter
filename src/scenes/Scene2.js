import Phaser from "phaser";

import Beam from "../entities/Beam"

import Ship from "../entities/Ship";

import Player from "../entities/Player";

import config from "../const/config";

import PowerUp from "../entities/PowerUp";
import DecreaserCounter from "../utils/DecreaserCounter";


export default class Scene2 extends Phaser.Scene{
    
    constructor(){
        super("playGame");
    }

    create(){

        this.shootQuanty = 1;

        this.background = this.add.tileSprite(
            0,0,
            config.width,
            config.height,
            "background"
        );

        this.background.setOrigin(0,0).setScale(2);

        this.enemies = this.physics.add.group();
        
        this.enemies.add(
            new Ship(
                this,
                {
                    x : config.width / 2 - 50,
                    y : config.height / 2,
                    sprite : "ship1",
                    anim : "ship1_anim",
                    vel : 2,
                    isEnable : true,
                    duration: Math.random()*5
                }
            )
        );
        this.enemies.add(
            new Ship(
                this,
                {
                    x : config.width / 2 - 50,
                    y : config.height / 2,
                    sprite : "ship1",
                    anim : "ship1_anim",
                    vel : 2,
                    isEnable : true,
                    duration: Math.random()*5
                }
            )
        );
        this.enemies.add(
            new Ship(
                this,
                {
                    x : config.width / 2 - 50,
                    y : config.height / 2,
                    sprite : "ship1",
                    anim : "ship1_anim",
                    vel : 2,
                    isEnable : true,
                    duration: Math.random()*5
                }
            )
        );
        this.enemies.add(
            new Ship(
                this,
                {
                    x : config.width / 2,
                    y : config.height / 2,
                    sprite : "ship2",
                    anim : "ship2_anim",
                    vel : 2,
                    isEnable : true,
                    duration: Math.random()*5
                }
            )
        );
        this.enemies.add(
            new Ship(
                this,
                {
                    x : config.width / 2,
                    y : config.height / 2,
                    sprite : "ship2",
                    anim : "ship2_anim",
                    vel : 2,
                    isEnable : true,
                    duration: Math.random()*5
                }
            )
        );
        this.enemies.add(
            new Ship(
                this,
                {
                    x : config.width / 2 + 50,
                    y : config.height / 2,
                    sprite : "ship3",
                    anim : "ship3_anim",
                    vel : 2,
                    isEnable : true,
                    duration: Math.random()*5
                }
            )
        );

        this.powerUps = this.physics.add.group();

        // 2.2 Add multiple objects
        var maxObjects = 2;
        for (var i = 0; i < maxObjects; i++) {
            const selectPowerUp = Math.random();
            var powerUp = new PowerUp(
                this,
                {
                    x : Math.random()*config.width,
                    y : Math.random()*config.height,
                    sprite : "powerUp",
                    anim : selectPowerUp > 0.5?"red":"gray",
                    points: selectPowerUp > 0.5? 50 : 25,
                    vel : selectPowerUp > 0.5? 6 : 4,
                    duration: selectPowerUp > 0.5? 20 : 10,
                    shootQuanty: selectPowerUp > 0.5? 2 : 3
                }
            );
            this.powerUps.add(powerUp);
        }

        this.player = new Player(
            this,
            {
                x : config.width / 2 - 8,
                y : config.height -64,
                sprite : "player",
                anim : "thrust",
                vel : 3
            }
        );
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.projectiles = this.add.group();

        //colision de proyectiles con los power ups
        //collider reduces valocity on colissionss
        this.physics.add.overlap(
            this.projectiles,
            this.powerUps,
            function(projectile,powerUp){
                projectile.destroy();
            }
        );

        //colision de los power ups con el player
        this.physics.add.overlap(
            this.player,
            this.powerUps,
            this.pickUpPower,
            null,
            this
        );

        //colision de los enemigos con los proyectiles
        //destruimos enemigo
        this.physics.add.overlap(
            this.projectiles,
            this.enemies,
            this.destroyEnemy,
            null,
            this
        );

        //colision de los enemigos con el player
        //destruimos player
        this.physics.add.overlap(
            this.player,
            this.enemies, 
            this.hurtPlayer, 
            null, 
            this
        );

        // 3.1 Add HUD background
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        //
        graphics.closePath();
        graphics.fillPath();

        // 2.1 add a score property
        this.score = 0;

        this.shields = 6;

        this.timeLeft = 300;

        this.scoreLabel = this.add.bitmapText(
            10, 
            5, 
            "pixelFont", 
            "SCORE " + this.zeroPad(this.score, 6),
            16
        );

        this.shieldsLabel = this.add.bitmapText(
            150, 
            5, 
            "pixelFont", 
            "SHIELDS " + this.zeroPad(this.shields, 3),
            16
        );

        this.timeLabel = this.add.bitmapText(
            350, 
            5, 
            "pixelFont", 
            "TIME LEFT " + this.zeroPad(this.timeLeft, 4),
            16
        );

        this.decreaseCounter = new DecreaserCounter(
            this,
            this.timeLeft
        );

    }

    update(){
        if(this.shields>0){
            this.player.movePlayerManager(this.cursorKeys);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
                this.shootBeam();
            }
            this.timeLabel.text = "TIME LEFT " + this.decreaseCounter.getLetfTime();
        }else{
            this.player.executeExplosion();
        }
        this.background.tilePositionY -= 0.5;
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
        this.powerUps
            .getChildren()
            .forEach(
                (powerUp) =>{
                    powerUp.update();
                }
            )
    }

    shootBeam(){
        for(let i=0;i<this.shootQuanty;i++){
            this.time.addEvent({
                delay: i*100,
                callback: function(){
                    this.projectiles.add(
                        new Beam(this)
                    );
                },
                callbackScope: this,
                loop: false
            });
        }
    }
    
    hurtPlayer(player, enemy) {
        if(enemy.getEnableState()){
            enemy.executeExplosion();
            setTimeout(
                function(){
                    enemy.makeVisible();
                }, 
                (enemy.getDuration()+1)*1000
            );
            //disminuimos los shields
            if(this.shields>0){
                this.shields--;
            }
            this.shieldsLabel.text = "SHIELDS " + this.zeroPad(this.shields,3);
        }
    }

    destroyEnemy(projectile,enemy){
        if(enemy.getEnableState()){
            projectile.destroy();
            enemy.executeExplosion();
            this.time.addEvent({
                delay: (enemy.getDuration()+1)*1000,
                callback: function(){
                    enemy.makeVisible();
                },
                callbackScope: this,
                loop: false
            });
            // 2.2 increase score
            this.setScore(15);
        }
    }

    // 4.1 zero pad format function
    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
        stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }


    pickUpPower(player,powerUp){
        //todo:add a momentaneus upgrade or downgrade to player
        if(powerUp.getVisibleState()){
            powerUp.executeEffect();
            this.time.addEvent({
                delay: powerUp.getDuration()*3*1000,
                callback: function(){
                    powerUp.makeVisible();
                },
                callbackScope: this,
                loop: false
            });
            this.shootQuanty = powerUp.getShootQuanty();
            this.time.addEvent({
                delay: powerUp.getDuration()*1000,
                callback: function(){
                    this.shootQuanty = 1;
                    powerUp.makeVisible();
                },
                callbackScope: this,
                loop: false
            });
            this.setScore(
                powerUp.getPoints()
            );
        }
    }

    setScore(valueToAdd){
        //updated value
        this.score += valueToAdd;
        // 2.3 update the score scoreLabel
        this.scoreLabel.text = "SCORE " + this.zeroPad(this.score, 6);
    }

};
