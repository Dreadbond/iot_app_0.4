import health from './health.js';


    let world = World.find();
    let handle = world.observe({
      added: function (doc) {
        
        lastEvent = doc.event ;
        //console.log("world added", lastEvent);

        if (lastEvent.TYPE == "damage") {
            
            Player.update({name: lastEvent.FROM }, {$set: {soundFile: "general/hit", soundFilePlayed: false}});

            Player.update({name: lastEvent.TO }, 
                {
                    $set: {
                        soundFile: "general/beenShot",
                        soundFilePlayed: false,
                        "inventory.hub.feedback": "beenShot",
                        "inventory.hub.feedbackPlayed": true,
                    },
                    $inc: {
                        health: -lastEvent.VALUE
                    }
            });
        }

        if (lastEvent.TYPE == "heal") {
            Player.update(
                {
                    name: lastEvent.TO },
                    {$inc: {
                        health: +lastEvent.VALUE
                    }
            });
        }
    }
});
