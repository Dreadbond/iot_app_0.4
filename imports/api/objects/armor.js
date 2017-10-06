let player = Player.find({});  //name: "Dreadbond"
let handle = player.observe({
  changed: function (doc, oldDoc) {


        if (doc.inMessage.from == ":armor" && doc.inMessageRead == false){
                console.log("----------------------EPEE--------------------");
                Player.update({_id: doc._id}, {$set: {inMessageRead: true}});

        action  = doc.inMessage.param;
        value   = doc.inMessage.value;

        if (action == "beenHit" && value == 1) {

                event = {};
                event.FROM  = doc.number ;
                event.part = "chest" ;
                event.TYPE  = "beenHit" ;
                World.insert({ event: event, createdAt: Date() });
        }
  }
}
});
//}

//feedbacks


