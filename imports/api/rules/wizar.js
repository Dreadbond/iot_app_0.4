
let player = Player.find({});
let handle = player.observeChanges({
  changed: function (id, fields) {
if (typeof fields.wizar != 'undefined'){
  try {
    player = Player.find({_id: id}).fetch()[0];    
    var regen ;
    
        if (player.wizar < 600 && !player.wizar_regen ){
            regen = Meteor.setInterval(
                function(){
                    Player.update(
                        {name: player.name},
                            {$inc: {
                                wizar: 4
                            }}
                    )
                }
                ,
                1000
            );

            Player.update(
                {name: player.name},
                    {$set: {
                        wizar_regen: true
                    }
                });
        }


        if (player.wizar >= 600) {
            Meteor.clearInterval(regen);
            Player.update(
                {name: player.name},
                    {$set: {
                        wizar: 600,
                        wizar_regen: false
                    }
                });
        }

        if (player.wizar < 0){
            Player.update(
                {name: player.name},
                    {$set: {
                        wizar: 0
                    }
                });
            }
        }
        catch(e){
        }
    }
}
});