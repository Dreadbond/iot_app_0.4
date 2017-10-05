let cursor = Player.find({});
cursor.observeChanges({
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
                killer = Player.find({name: player.lastShooter}).fetch()[0];

                Player.update(
                {name: player.name},
                    {$set: {
                        health: 0,
                        isDead: true, 
                        soundFile: "general/death"
                    },
                    $inc: {death: +1}
                });

                Player.update(
                    {name: killer.name},
                        {$set: {
                            soundFile: "general/frag"
                        },
                        $inc: {frag: +1}
                    });

                let event = {};
                event.FROM  = player.name ;
                event.TYPE  = "died" ;

                World.insert({ event: event, createdAt: Date() });

                new rez(player.name);
                // new rez2(player.name);
            }
            if (player.health <= 0 && player.isDead == true){
                Player.update(
                    {name: player.name},
                        {$set: {
                            health: 0,
                        }
                    });
            }
        Meteor.call('hubSend', player.tag, ":hub", "health", player.health);
        }
    catch(e){console.log(id, fields, e);}
    }
  //});
}
});


function rez(dead){
    Meteor.setTimeout(
        ()=> {
            console.log("rez", dead);
            Player.update(
                {name: dead},
                    {$set: {
                        isDead: false,
                        health: 100,
                        armor: 0,
                    }
                });

                Meteor.call('hubSend', dead, ":hub", "healed", "1");
                Meteor.call('hubSend', dead, ":hub", "health", "100");
                Player.update({name: dead }, {$set: {soundFile: "general/respawn"}});

                let event = {};
                event.FROM  = dead ;
                event.TYPE  = "respawned" ;

                World.insert({ event: event, createdAt: Date() });
                //{"to": "!11","from": ":grimoire","param": "fire","value": "1"}
                //Meteor.call('sound',  ()=> {});
        }
        ,3000
    );
}


function rez2(dead){
    date = new Date();
    console.log("died", dead);
    jobName = "respawn" + Math.random() + dead;

    SyncedCron.add({
        name: jobName,
        schedule: function (parser) {
            //new Date(date.getTime() + 4000)
            return parser.recur().on(new Date(date.getTime() + 4000)).fullDate();
        },
        job: function () {
                Player.update(
                    {name: dead},
                        {$set: {
                            isDead: false,
                            health: 100,
                            armor: 0,
                        }
                });

                Meteor.call('hubSend', dead, ":hub", "healed", "1");
                Meteor.call('hubSend', dead, ":hub", "health", "100");
                Player.update({name: dead }, {$set: {soundFile: "general/respawn"}});

                let event = {};
                event.FROM  = dead ;
                event.TYPE  = "respawned" ;

                World.insert({ event: event, createdAt: Date() });
                //{"to": "!11","from": ":grimoire","param": "fire","value": "1"}
                //Meteor.call('sound',  ()=> {});
                console.log("repop fin", dead);
                
                SyncedCron.remove(jobName)
        }
    });
}
