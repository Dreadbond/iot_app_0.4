let player = Player.find({});
let handle = player.observeChanges({
  changed: function (id, fields) {
    

if (typeof fields.health != 'undefined'){
    try {

    player = Player.find({_id: id}).fetch()[0];    

        if (player.health > 100){
            Player.update(
                {name: player.name},
                    {$set: {
                        health: 100
                    }
                });
        }

            if (player.health <= 0 && player.isDead == false){

                Player.update(
                {name: player.name},
                    {$set: {
                        health: 0,
                        isDead: true, 
                        soundFile: "general/death"
                    },
                    $inc: {death: +1}
                });

                let event = {};
                event.FROM  = player.name ;
                event.TYPE  = "died" ;

                World.insert({ event: event, createdAt: Date() });

                    Meteor.setTimeout( function() {
                        Player.update(
                            {name: player.name},
                                {$set: {
                                    isDead: false,
                                    health: 100,
                                    armor: 0,
                                }
                            });

                            Meteor.call('hubSend', player.name, ":hub", "healed", "1");
                            Meteor.call('hubSend', player.name, ":hub", "health", "100");
                            Player.update({name: player.name }, {$set: {soundFile: "general/respawn"}});

                            let event = {};
                            event.FROM  = player.name ;
                            event.TYPE  = "respawned" ;
            
                            World.insert({ event: event, createdAt: Date() });
                            //Meteor.call('sound',  ()=> {});
                        }
                        ,3000
                    );
            }
            if (player.health <= 0 && player.isDead == true){           //rejeter le mutator
                Player.update(
                    {name: player.name},
                        {$set: {
                            health: 0,
                        }
                    });
            }
        }
    catch(e){console.log(id, fields);}
    }
}
});