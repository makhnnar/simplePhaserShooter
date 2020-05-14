import Scene1 from "../scenes/Scene1";
import Scene2 from "../scenes/Scene2";
import GoalScene from "../scenes/GoalScene";

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 544,
    backgroundColor: 0x000000,
    scene:[Scene1,Scene2,GoalScene],
    physics:{
      default:"arcade",
      acade:{
          debug:false
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,//ajustamos a todo el tam de pantalla
      autoCenter: Phaser.Scale.CENTER_BOTH //centramos en ambas direcciones
    }
};

export default config;