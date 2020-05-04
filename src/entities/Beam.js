import Phaser from "phaser";
//todo: crear efectos a los power ups
//agregar mas enemigos
//resetear puntaje en colision
//colocar contador de vidas
//aumentar la velocidad a medida que pasa el tiempo
//colocar enemigos que devuelven los proyectiles
//agregar colision de proyectiles con el player
export default class Beam extends Phaser.GameObjects.Sprite{

    constructor(scene) {
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene,x,y,"beam");
        scene.add.existing(this);
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;
        //scene.projectiles.add(this);
        //this.displayHeight = 64;
        //this.displayWidth = 64;
    }

    update(){
        if(this.y < 32 ){
          this.destroy();
        }
    }
}
