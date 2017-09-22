let player = Player.find({name: "Dreadbond"});
let handle = player.observe({
  changed: function (doc, oldDoc) {


        if (doc.inMessage.from == ":grimoire" && doc.inMessageRead == false){
                console.log("----------------------GRIMOIRE--------------------");
                Player.update({_id: doc._id}, {$set: {inMessageRead: true}});

        action  = doc.inMessage.param;
        value   = doc.inMessage.value;

        if (action == "shield" && value == 1) {
            Player.update({_id: doc._id}, {$inc: {"inventory.pistol.ammo": -1}, $set: {soundFile: "pistol/shoot"}});
                Meteor.call('hubSend', doc.tag, ":pistol", "shootFB", "1");

                event = {};
                event.FROM  = doc.name ;
                event.TO    = doc.rangedTarget ;
                event.TYPE  = "shield" ;
                event.DURATION = 3000 ;

                World.insert({ event: event, createdAt: Date() });
        }

        if (action == "heal" && value == 1) {
                Player.update({_id: doc._id}, {$inc: {"inventory.pistol.ammo": -1}, $set: {soundFile: "pistol/shoot"}});
                    Meteor.call('hubSend', doc.tag, ":pistol", "shootFB", "1");
    
                    event = {};
                    event.FROM  = doc.name ;
                    event.TO    = doc.rangedTarget ;
                    event.TYPE  = "heal" ;
                    event.VALUE = 20 ;
    
                    World.insert({ event: event, createdAt: Date() });
            }

        if (action == "fireNova" && value == 1) {
        Player.update({_id: doc._id}, {$inc: {"inventory.pistol.ammo": -1}, $set: {soundFile: "pistol/shoot"}});
                Meteor.call('hubSend', doc.tag, ":pistol", "shootFB", "1");

                event = {};
                event.FROM  = doc.name ;
                event.TO    = doc.rangedTarget ;
                event.TYPE  = "fire_damage" ;
                event.DAMAGE= 5 ;
                event.DURATION = 5000 ;

                World.insert({ event: event, createdAt: Date() });
        }

  }
}
});
//}

//feedbacks


