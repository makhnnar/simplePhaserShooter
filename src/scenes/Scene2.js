import Phaser from "phaser";

import Beam from "../entities/Beam"

import Ship from "../entities/Ship";

import Player from "../entities/Player";

import config from "../const/config";

import PowerUp from "../entities/PowerUp";


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

        this.enemies = this.physics.add.group();
        
        this.enemies.add(
            new Ship(
                this,
                {
                    x : config.width / 2 - 50,
                    y : config.height / 2,
                    sprite : "ship1",
                    anim : "ship1_anim",
                    vel : 2
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
                    vel : 2
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
                    vel : 2
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
                    vel : 2
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
                    vel : 2
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
                    vel : 2
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
                    vel : selectPowerUp > 0.5? 6 : 4
                }
            );
            this.powerUps.add(powerUp);
        }

        this.input.on(
            'gameobjectdown',
            this.destroyShip,
            this
        );

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

        // 1.3 new text using bitmap font
        //this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);

        // 4.3 format the score
        var scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated  , 16);

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
        this.powerUps
            .getChildren()
            .forEach(
                (powerUp) =>{
                    powerUp.update();
                }
            )
    }

    shootBeam(){
        var beam = new Beam(this);
        this.projectiles.add(beam);
    }
    
    destroyShip(pointer,gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    hurtPlayer(player, enemy) {
        if(enemy.getVisibleState()){
            enemy.executeExplosion();
            setTimeout(
                function(){
                    enemy.makeVisible();
                }, 
                1000
            );
            player.x = config.width / 2 - 8;
            player.y = config.height - 64;
        }
    }

    destroyEnemy(projectile,enemy){
        if(enemy.getVisibleState()){
            projectile.destroy();
            enemy.executeExplosion();
            setTimeout(
                function(){
                    enemy.makeVisible();
                }, 
                1000
            );
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
                delay: 1000,
                callback: function(){
                    powerUp.makeVisible();
                },
                callbackScope: this,
                loop: false
            });
            this.setScore(100);
        }
    }

    setScore(valueToAdd){
        //updated value
        this.score += valueToAdd;
        // 4.2 format the score
        var scoreFormated = this.zeroPad(this.score, 6);
        // 2.3 update the score scoreLabel
        this.scoreLabel.text = "SCORE " + scoreFormated;
    }

};
