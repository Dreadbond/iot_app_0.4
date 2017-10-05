    let world = World.find();
    let handle = world.observe({
      added: function (doc) {
        
        lastEvent = doc.event ;

    if (lastEvent.TYPE == "damage") {

            Player.update({name: lastEvent.FROM }, {$set: {soundFile: "general/hit", soundFilePlayed: false}});
            from = Player.find({name: lastEvent.FROM}).fetch()[0];


            for (var i=0; i<lastEvent.TO.length; i++) {
                victim = Player.find({number: lastEvent.TO[i]}).fetch()[0];
                    // console.log("from.team", from.team);
                    // console.log("lastEvent.TO[0]", lastEvent.TO[i]);
                    // console.log("victim.team", victim.team, lastEvent.TO[i]);

                    if (from.team != victim.team)
                    {
                        if (victim.buffs.barrier.active) {
                            console.log("Barrière de", lastEvent.TO[i], "a absorbé les dommages.");
                            Player.update({number: lastEvent.TO[i]},
                                {
                                    $set: {
                                        soundFile: "general/barrierShot",
                                        soundFilePlayed: false,
                                        "inventory.hub.feedback": "barrierShot",
                                        "inventory.hub.feedbackPlayed": false,
                                    },
                            });
                        }
                        else //if (!victim.buffs.barrier.active)
                        {
                            console.log(lastEvent.VALUE, "damage at:", lastEvent.TO[i] );
                           // if (victim.buffs.berserk)


                            Player.update({number: lastEvent.TO[i]},
                                {
                                    $set: {
                                        soundFile: "general/beenShot",
                                        soundFilePlayed: false,
                                        "inventory.hub.feedback": "beenShot",
                                        "inventory.hub.feedbackPlayed": false,
                                        lastShooter: lastEvent.FROM,
                                    },
                                    $inc: {
                                        health: -lastEvent.VALUE
                                    }
                            });

                            if (lastEvent.DAMAGE_TYPE == "fire") {
                                Player.update({number: lastEvent.TO[i]},
                                    {
                                        $set: {
                                            "inventory.hub.feedback": "onFire",
                                            "inventory.hub.feedbackPlayed": false,
                                        },
                                });
                            }
                        }

                    }
            }
    } //damage


    if (lastEvent.TYPE == "heal") {
        
                    //Player.update({name: lastEvent.FROM }, {$set: {soundFile: "general/hit", soundFilePlayed: false}});
                    from = Player.find({name: lastEvent.FROM}).fetch()[0];
        
        
                    for (var i=0; i<lastEvent.TO.length; i++) {
                        target = Player.find({number: lastEvent.TO[i]}).fetch()[0];
                            //  console.log("from.team", from.team);
                            //  console.log("lastEvent.TO[0]", lastEvent.TO[i]);
                            //  console.log("target.team", target.team, lastEvent.TO[i]);
        
                            if (from.team == target.team)
                            {
                                // console.log(lastEvent.VALUE, "heal at:", lastEvent.TO[i] );
                                Player.update({number: lastEvent.TO[i]},
                                    {
                                        $set: {
                                            soundFile: "general/heal",
                                            soundFilePlayed: false,
                                            "inventory.hub.feedback": "healed",
                                            "inventory.hub.feedbackPlayed": false,
                                            lastShooter: lastEvent.FROM,
                                        },
                                        $inc: {
                                            health: +lastEvent.VALUE
                                        }
                                });
                            }
                    }
            } //heal
    }
});
