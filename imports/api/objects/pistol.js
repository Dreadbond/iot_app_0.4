let player = Player.find({});  //name: "Dreadbond"
let handle = player.observe({
  changed: function (doc, oldDoc) {


        if (doc.inMessage.from == ":pistol" && doc.inMessageRead == false){
                console.log("----------------------PISTOL--------------------");
                Player.update({_id: doc._id}, {$set: {inMessageRead: true}});

        action  = doc.inMessage.param;
        value   = doc.inMessage.value;

        if (action == "trigger" && value == 1 && doc.inventory.pistol.ammo > 0) {
            Player.update({_id: doc._id}, {$inc: {"inventory.pistol.ammo": -1}, $set: {soundFile: "pistol/shoot"}});
                Meteor.call('hubSend', doc.tag, ":pistol", "shootFB", "1");

                event = {};
                event.FROM  = doc.number ;
                event.target_mode = "directTarget";
                event.TO    = [];
                event.TO.push(doc.inventory.pistol.directTarget) ;
                event.hit_mode = "distance";
                event.ammo_mode = "standard" ;
                event.projectile_speed = "0" ;
                event.TYPE  = "damage" ;
                event.VALUE = 20 ;

                World.insert({ event: event, createdAt: Date() });
            //}
        }

    else if (action == "trigger" && doc.inventory.pistol.ammo <= 0){
            Player.update({_id: doc._id}, {$set: {soundFile: "pistol/depleted"}});
            }

    if (action == "reload" ){
            Player.update({_id: doc._id}, {$set: {"inventory.pistol.ammo": 6, soundFile: "pistol/reload"}});
            }

    if (action == "target") {
        //target = Meteor.call('targetConv', value) ;
        Player.update({_id: doc._id}, {$set: {"inventory.pistol.directTarget": value}});

            if (value != "void"){
                Meteor.call('hubSend', doc.tag, ":pistol", "sightFB", "0");
        }
        else {
                Meteor.call('hubSend', doc.tag, ":pistol", "!sightFB", "0");
        }
    }
  }
}
});
//}

//feedbacks


