let player = Player.find({});
let handle = player.observe({
  changed: function (doc, oldDoc) {


        if (doc.inMessage.from == ":grimoire" && doc.inMessageRead == false){
                console.log("----------------------GRIMOIRE--------------------");
                Player.update({_id: doc._id}, {$set: {inMessageRead: true}});
                //{"to": "!11","from": ":grimoire","param": "shield","value": "1"}

        action  = doc.inMessage.param;
        value   = doc.inMessage.value;

        if (action == "shield" && value == 1) {
            Player.update({_id: doc._id}, {$inc: {wizar: -10}, $set: {soundFile: "grimoire/barrier"}});
                Meteor.call('hubSend', doc.tag, ":grimoire", "barrier", "1");

                event = {};
                event.FROM  = doc.number ;
                event.TO  = []  ;
                for (var i=0; i<doc.rangedTarget.length; i++) {
                        if (doc.rangedTarget[i].distance < 650){
                        event.TO.push(doc.rangedTarget[i].number);
                        }
                    }
                event.TO.push(doc.number);
                event.hit_mode = "distance" ;
                event.TYPE  = "barrier" ;
                event.DURATION = 3000 ;
                World.insert({ event: event, createdAt: Date() });
        }

        if (action == "heal" && value == 1) {
                Player.update({_id: doc._id}, {$inc: {wizar: -10}, $set: {soundFile: "grimoire/heal"}});
                    Meteor.call('hubSend', doc.tag, ":grimoire", "heal", "1");
    
                    event = {};
                    event.FROM  = doc.number ;
                    event.TO  = []  ;
                    for (var i=0; i<doc.rangedTarget.length; i++) {
                        if (doc.rangedTarget[i].distance < 650){
                        event.TO.push(doc.rangedTarget[i].number);
                        }
                    }
                    event.hit_mode = "distance" ;
                    event.TYPE  = "heal" ;
                    event.VALUE = 20 ;
    
                    World.insert({ event: event, createdAt: Date() });
            }

        if (action == "fire" && value == 1) {
        Player.update({_id: doc._id}, {$inc: {wizar: -20}, $set: {soundFile: "grimoire/fire"}});
        //{"to": "!11","from": ":grimoire","param": "fire","value": "1"}

                Meteor.call('hubSend', doc.tag, ":grimoire", "fireNova", "1");
                //console.log(Object.keys(doc.inventory).length);
                event = {};
                event.FROM  = doc.number ;
                event.TO  = []  ;
                for (var i=0; i<doc.rangedTarget.length; i++) {
                        if (doc.rangedTarget[i].distance < 650){
                        event.TO.push(doc.rangedTarget[i].number);
                        }
                    }
                event.TYPE  = "damage" ;
                event.hit_mode = "distance" ;
                event.DAMAGE_TYPE = "fire";
                event.VALUE= 26 ;
                event.DAMAGE_OVER_TIME= 5 ;
                event.DURATION = 5000 ;

                World.insert({ event: event, createdAt: Date() });
        }

  }
}
});


/*
{"to": "!11","from": ":grimoire","param": "shield","value": "1"}
{"to": "!11","from": ":grimoire","param": "heal","value": "1"}
{"to": "!11","from": ":grimoire","param": "fire","value": "1"}

*/