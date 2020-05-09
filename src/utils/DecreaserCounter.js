import Phaser from "phaser";

/**
 * Hay ciertas classes de las que no se puede heredar
 * Para ello, lo mejor es pasar la escena como parametro
 * y hacer las ediciones pertinentes. Por ejemplo: Phaser.Time.Clock
 * Puede ser heredada, pero no se le pueden agregar 
 * mas parametros o metodos. Aparentemente lo que sucede, 
 * es que no puedes agregar mas metodos, o parametros
 * a la clase que hereda, sin llamar antes al constructor
 * padre a traves de super.
 */

export default class DecreaserCounter extends Phaser.Time.Clock{

    leftTimeInsecs = 300;
    leftTimeInString = "05:00";

    constructor(scene,timeToStartCount) {
        super(
            scene
        );
        this.leftTimeInString = this.getAsTimeString(timeToStartCount);
        this.leftTimeInsecs = timeToStartCount;
        scene.time.addEvent(
            {
                delay: 1000,
                callback:this.updateTime,
                callbackScope: this,
                loop: true
            }
        );
        scene.add.existing(this);
    }

    updateTime(){
        if(this.leftTimeInsecs>0){
            this.leftTimeInsecs--;
            this.leftTimeInString = this.getAsTimeString(
                this.leftTimeInsecs
            );
        }
    }

    getAsTimeString(timeInSecs){
        let dateObj = new Date(timeInSecs * 1000);
        let minutes = dateObj.getUTCMinutes();
        let seconds = dateObj.getSeconds();
        let timeString = minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
        return timeString;
    }

    getLetfTime(){
        return this.leftTimeInString;
    }
}
