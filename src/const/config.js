import Scene1 from "../scenes/Scene1";
import Scene2 from "../scenes/Scene2";

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 544,
    backgroundColor: 0x000000,
    scene:[Scene1,Scene2],
    physics:{
      default:"arcade",
      acade:{
          debug:false
      }
    }
};

export default config;