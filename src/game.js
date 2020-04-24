var gameSettings = {
    playerSpeed: 200,
    maxPowerups: 2,
    powerUpVel: 50,
}

var config = {
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
}

window.onload = function(){
    var game = new Phaser.Game(config);
}

//asi se lee un json almacenado en algun lado
/*fetch('https://raw.githubusercontent.com/makhnnar/myKotlinTips/gh-pages/manifest.json')
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
       this.users = json;
       console.log(JSON.stringify(json));
   })
   .catch(function () {
        console.log('Errol llave');
   });*/