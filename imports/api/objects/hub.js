let player = Player.find({name: "Dreadbond"});
let handle = player.observe({
    changed: function (doc, oldDoc) {
    // console.log("hub", doc.inventory.hub.feedback, doc.inventory.hub.feedbackPlayed);

        if (doc.inventory.hub.feedbackPlayed == false){
                console.log("----------------------HUB--------------------");
                Player.update({name: "Dreadbond" }, {$set: {inMessageRead: true}});

                param = doc.inventory.hub.feedback ; 
            // action  = doc.inMessage.param;
            // value   = doc.inMessage.value;

            if(param == "beenShot"){
                Meteor.call('hubSend', doc.tag, to, param, value);
            }
            if(param == "onFire"){
                Meteor.call('hubSend', doc.tag, to, param, value);
            }
            if(param == "poisoned"){
                Meteor.call('hubSend', doc.tag, to, param, value);
            }
        }
    }
});