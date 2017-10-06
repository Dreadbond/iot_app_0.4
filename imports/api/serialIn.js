import serialport from 'serialport';
import './methods.js';
import './rules/general.js';
import './objects/objects.js';


var thisPlayer = Player.find({name: "Dreadbond"}).fetch[0];

var port = "COM5" ; //process.argv[2];

var sp = new serialport.SerialPort(port, {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

sp.on('open', onPortOpen);
sp.on('data', onData);
sp.on('close', onClose);
sp.on('error', onError);

function onPortOpen(){
    console.log("Port ouvert !");
}

function onClose(){
    console.log("Port is closed, yo");
}
function onError(){
    console.log("Arduino branché ?");
}

function onData(incomingData)
{
        try {
            mess = JSON.parse(incomingData);
            }
        catch(e){console.log("Erreur réception Ardu : ", e)}

        console.log(incomingData);
        Meteor.call('playerAction', ()=> {
            Player.update({tag: mess.to }, {$set: {"inMessage": mess, "inMessageRead": false}});
        });

    //objects.general() ;
}


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////SENDS/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

Meteor.methods({
    hubSend(from, to, param, value ){
        value = value.toString()
        
    var DataToSend = new Object();
    DataToSend.to = to;
    DataToSend.from  = from;
    DataToSend.param = param;
    DataToSend.value = value;
    DataToSend= JSON.stringify(DataToSend);
        // console.log("Envoi Ardu :", DataToSend);
    sp.write(DataToSend);
    },
});













