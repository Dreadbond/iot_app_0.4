let player = Player.find({});  //name: "Dreadbond"
let handle = player.observe({
  changed: function (doc, oldDoc) {


        if (doc.inMessage.from == ":sword" && doc.inMessageRead == false){
                console.log("----------------------EPEE--------------------");
                Player.update({_id: doc._id}, {$set: {inMessageRead: true}});

        action  = doc.inMessage.param;
        value   = doc.inMessage.value;

        if (action == "hit" && value == 1) {

                event = {};
                event.FROM  = doc.number ;
                event.hit_mode = "melee" ;
                event.TYPE  = "damage" ;
                event.figure = "unknown";
                event.VALUE = 30 ;
                World.insert({ event: event, createdAt: Date() });

                event = {};
                event.FROM  = "2" ;
                event.TYPE  = "beenHit" ;
                World.insert({ event: event, createdAt: Date() });
        }
  }
}
});
//}

//feedbacks


