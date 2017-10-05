let player = Player.find({});  //name: "Dreadbond"
let handle = player.observe({
    changed: function (doc, oldDoc) {
    // console.log("hub", doc.inventory.hub.feedback, doc.inventory.hub.feedbackPlayed);

        if (doc.inMessage.from == ":hub" && doc.inMessageRead == false){
            //console.log("----------------------HUB IN--------------------");
            Player.update({_id: doc._id}, {$set: {inMessageRead: true}});
            

            if (doc.inMessage.param = "rangedTarget"){
                doc.inMessage.target -= 48 ;
                doc.inMessage.value = 1000 - doc.inMessage.value ;

                for (var i=0; i<doc.rangedTarget.length; i++) {
                    if (doc.rangedTarget[i].number == doc.inMessage.target) {
                        message = doc.rangedTarget ;
                        message[i].number =  JSON.stringify(doc.inMessage.target) ;
                        message[i].distance = doc.inMessage.value ;

                        //console.log(message);

                        Player.update({_id: doc._id}, 
                            {$set: {
                                rangedTarget: message
                            }
                        });
                    }
                }

            }


        }

        if (doc.inventory.hub.feedbackPlayed == false){
                console.log("----------------------HUB FB--------------------");
                Player.update({_id: doc._id}, {$set: {"inventory.hub.feedbackPlayed": true}});   //

                param = doc.inventory.hub.feedback ; 
                to = ":hub";

                Meteor.call('hubSend', doc.tag, to, param, value);

        }
    }
});