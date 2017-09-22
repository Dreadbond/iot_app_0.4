import {Meteor} from 'meteor/meteor';
import Player from '../imports/api/collections/player.js';
import World from '../imports/api/collections/world.js';
import '../imports/api/serialIn.js';


Meteor.startup(() => {
  Player.remove({});
  World.remove({});

  date = Date();

    let newPlayer = {
        name : "Dreadbond",
        number: 1,
        tag: "!11",
        health: 100,
        armor: 0,
        wizar: 100,

        inMessage: "",
        inMessageRead: true,


        inventory: 
            {pistol: {
                directTarget: "none",
                ammoType: "standart",
                ammo: 6,
                feedback: "",
                feedbackPlayed: true,
                },
            hub: {
                type: "standart",
    
                feedback: "",
                feedbackPlayed: true,
            },


        },

        rangedTarget: [],
        buff: [],



        frag: 0,
        death: 0,

        isDead: false,

        event: "",
        soundFile: "void",
        soundPlayed: true,

        feedback: "",
    };

    
    
    let defaultWorld = {
        event : "creation",
        eventRead: true,
        createdAt : date
    };

    Player.insert(newPlayer);
    newPlayer.name = "Alarik";
    newPlayer.number = 2;
    newPlayer.tag = "!22";
    Player.insert(newPlayer);

    World.insert(defaultWorld);

});