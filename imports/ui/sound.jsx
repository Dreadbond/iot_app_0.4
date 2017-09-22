//meteor add brentjanderson:buzz
//http://buzz.jaysalvat.com/documentation/sound/
//var s = new buzz.sound(sound);

//Player.update({name: "Dreadbond" }, {$set: {soundFile: "pistol/depleted"}});
//et
//    Meteor.call('sound',  ()=> {});

Meteor.methods({
    button(){
        try {
            var s = new buzz.sound('/sounds/pistol/shoot.mp3');
            s.play();
            }
            catch(e) {}
    },

    sound(){
      
    sound = Player.find({}).fetch()[0] ;
    if (sound.soundFile != "void") {
      try {
        sound = "/sounds/" + sound.soundFile + ".mp3" ;
        var s = new buzz.sound(sound); //, {formats: [ "ogg", "mp3", "aac", "wav" ]});
        s.play();
        }
      catch(e) {}
      }
      //Player.update({name: "Dreadbond" }, {$set: {soundFile: "void"}});
    }
});