let world = World.find();
    let handle = world.observe({
      added: function (doc) {
        
        lastEvent = doc.event ;
        
        if (lastEvent.TYPE == "barrier") {

            Player.update({name: lastEvent.FROM }, {$set: {soundFile: "general/barrierCasted", soundFilePlayed: false}});
            from = Player.find({name: lastEvent.FROM}).fetch()[0];

            for (var i=0; i<lastEvent.TO.length; i++) {
                target = Player.find({number: lastEvent.TO[i]}).fetch()[0];
                    // console.log("from.team", from.team);
                    // console.log("lastEvent.TO[0]", lastEvent.TO[i]);
                    // console.log("target.team", target.team, lastEvent.TO[i]);

                if (from.team == target.team)
                {

                    console.log("barrier at:", lastEvent.TO[i] );
                    Player.update({number: lastEvent.TO[i]},
                        {
                            $set: {
                                soundFile: "general/barrierBuff",
                                soundFilePlayed: false,
                                "inventory.hub.feedback": "shield",
                                "inventory.hub.feedbackPlayed": false,
                                "buffs.barrier.active": true,
                                "buffs.barrier.endsAt": new Date()
                            },
                    });

                    new barrierStop(target.name);
                }
            }
        } //barrier
    }
});

function barrierStop(player){
    Meteor.setTimeout(
        ()=> {
            console.log("barrierStop", player);
            Player.update(
                {name: player},
                    {$set: {
                        "buffs.barrier.active": false,
                        soundFile: "general/barrierStop",
                        soundFilePlayed: false,
                    }
                });

 

        }
        ,3000
    );
}