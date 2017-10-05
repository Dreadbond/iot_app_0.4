Meteor.methods({
    targetConv(inNumber){

        if (inNumber == 0){
            return "void";
        }

        if (inNumber.startsWith("!"))
        {
            target = Player.find({tag: inNumber}).fetch()[0];
            return target.name ;
        }

    inNumber = Number(inNumber); 

    target = Player.find({number: inNumber}).fetch()[0];
    return target.name;
    // console.log("cible id", inNumber, _id) ;
}

});