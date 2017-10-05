import {Meteor} from 'meteor/meteor';
import Player from '../imports/api/collections/player.js';
import World from '../imports/api/collections/world.js';
import '../imports/api/serialIn.js';
// meteor add percolate:synced-cron

Meteor.startup(() => {
    date = new Date();

    SyncedCron.start();


    // SyncedCron.add({
    //     name: "cron_name",
    //     schedule: function (parser) {
    //       // ending_at is a Date object set to some future date
    //       // there is no recurrence
    //       //date = date.setSeconds(date.getSeconds() + 4)

    //       return parser.recur().on(new Date(date.getTime() + 4000)).fullDate();
    //     },
    //     job: function () {
    //       console.log("yep ?");
    //     }
    //   });
    

  Player.remove({});
  World.remove({});

  

    let newPlayer = {
        name : "Dreadbond",
        number: "1",
        team: "blue",
        tag: "!11",
        health: 100,
        armor: 0,
        wizar: 600,

        inMessage: "",
        inMessageRead: true,

        wizar_regen: false,
        health_regen: false,

        inventory: 
            {pistol: {
                directTarget: "2",
                ammoType: "standart",
                ammo: 100,
                feedback: "",
                feedbackPlayed: true,
                },
            hub: {
                type: "standart",
    
                feedback: "",
                feedbackPlayed: true,
            },
            grimoire: {
                runes:{
                    shield: false,
                    heal: false,
                    fire: false
                    },
                feedback: "",
                feedbackPlayed: true,
            },
            


        },

        rangedTarget: [
            {
                number: "2",
                distance: 600,
            },
            {
                number: "3",
                distance: 600,
            },
            {
                number: "4",
                distance: 600,
            },
            {
                number: "5",
                distance: 600,
            },
        ],
        buffs: {
            barrier: {
                active: false,
                endsAt: 0,
            },

        },

        lastShooter: "",

        frag: 0,
        death: 0,

        isDead: false,
        respawnAt: 0,

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
    newPlayer.team = "red",
    newPlayer.number = "2";
    newPlayer.tag = "!22";
    newPlayer.rangedTarget = [{number: 1,distance: 600},{number: 3,distance: 700},{number: 4,distance: 800}];
    Player.insert(newPlayer);

    newPlayer.name = "Dessloch";
    newPlayer.team = "red",
    newPlayer.number = "3";
    newPlayer.tag = "!33";
    newPlayer.rangedTarget = [{number: 2,distance: 600},{number: 1,distance: 700},{number: 4,distance: 800}];
    Player.insert(newPlayer);

    newPlayer.name = "Vikti";
    newPlayer.team = "blue",
    newPlayer.number = "4";
    newPlayer.tag = "!44";
    newPlayer.rangedTarget = [{number: 2,distance: 600},{number: 3,distance: 700},{number: 1,distance: 800}];
    Player.insert(newPlayer);

    newPlayer.name = "Rhea";
    newPlayer.team = "red",
    newPlayer.number = "5";
    newPlayer.tag = "!55";
    newPlayer.rangedTarget = [{number: 2,distance: 600},{number: 3,distance: 700},{number: 1,distance: 800}];
    Player.insert(newPlayer);

    World.insert(defaultWorld);

});