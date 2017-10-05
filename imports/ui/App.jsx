import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Player from '../api/collections/player.js';
import World from '../api/collections/world.js';
//import combats from '../api/world/combats.js';
import './sound.jsx';
import Sound from 'react-sound';
import Task from './Task.jsx';

//meteor add brentjanderson:buzz
//http://buzz.jaysalvat.com/documentation/sound/


class App extends Component {  
  _refresh() {
    Meteor.call('button',  ()=> {
    });
  }

  _inputTest(){
    Meteor.call('_inputTest',  ()=> {
    });
  }

  _sound(){
    Meteor.call('sound',  ()=> {
    });
  }

  _newEvent(){
    var event = document.getElementById("eventText").value;
        event += '}';
    var messJson ;

                try {
                        messJson = JSON.parse(event);
                }
                catch(e){console.log("Erreur envoi event manuel : ", e)}
                
                World.insert({
                        event: messJson , createdAt: new Date() 
                        }
                        //,()=>{}Meteor.call('worldProcess');
                );

  }
  
  _newHubEvent(){
    var event = document.getElementById("manualHubText").value;
    id = Player.find({name: "Dreadbond"}).fetch()[0];
    id = id._id ;

                try {
                        messJson = JSON.parse(event);
                }
                catch(e){console.log("Erreur envoi event manuel : ", e)}

                Meteor.call('writeDB', ()=> {
                  Player.update({_id: id }, {$set: {inMessage: messJson, inMessageRead: false}});
                });

  }

  _manualSend(){
      var from = document.getElementById("from").value;
      var to = document.getElementById("to").value;
      var param = document.getElementById("param").value;
      var value = document.getElementById("value").value;      
    Meteor.call('hubSend', from, to, param, value, ()=> {
    });
  }


  renderTasks() {
    return this.props.tasks.map((task) => (
    //return this.getTasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  _fonctionTest() {
  player.health = "arf";
    Tracker.autorun(() => {
    player = Player.find({name: "Dreadbond"}).fetch()[0];
    }
  );
  return player.health ;
} 


  render() {
function stat(asked, asked2, asked3) {
  player = Player.find({}).fetch()[0] ;
    try {
        if (!asked2) {asked = player[asked];}
    else if (asked3) {asked = player[asked][asked2][asked3];}
    else if (asked2) {asked = player[asked][asked2];}
    }
    catch(e){
    }  

    if (asked == undefined) {asked = "???"};

    asked = JSON.stringify(asked);

    return asked ;
}

    return (
<div id="interface">

<div id="right-column">
  Timeline :
  <ul id="chatbox" >
    {this.renderTasks()}
  </ul>
</div>

<div id="left-column">
  <div id="player">
  <h3>Wizapp</h3>

         <p>{stat("name")} 
         <br/>ID {stat("_id")} 
         <br/>Number {stat("number")}
         <br/>Ranged targets :
            <br/>{stat("rangedTarget","0","number")} at {stat("rangedTarget", "0","distance")} 
            <br/>{stat("rangedTarget","1","number")} at {stat("rangedTarget", "1","distance")} 
            <br/>{stat("rangedTarget","2","number")} at {stat("rangedTarget", "2","distance")} 
            <br/>{stat("rangedTarget","3","number")} at {stat("rangedTarget", "3","distance")} 
          <br/>Frag : {stat("frag")} Death : {stat("death")}

          <br/> <img src="/gui/barres/healthbar2.png" style={{width: 20,height: 20}} /> {stat("health")}
                <img src="/gui/zsources/496_RPG_icons/E_Wood03.png" style={{width: 20,height: 20, marginLeft: 20}} /> {stat("armor")} 
                <img src="/gui/zsources/painterly-spell-icons-4/light-blue-3.png" style={{width: 20,height: 20, marginLeft: 20}} />{stat("wizar")} 
          </p>
        </div>

        <div id="currentWeapon">
        <h2>{"Pistol"}</h2>
          <ul>
            <li>ammo : {stat("inventory","pistol","ammo")} {stat("inventory","pistol","ammoType")}</li>
            
            <li>target : {stat("inventory","pistol","directTarget")}</li>

            <li>hub : {stat("inventory","hub","feedback")}</li>
          </ul>
        </div> 

        <div id="event">
          {stat("event")}
          <div onClick={this._sound}>sound : {stat("soundFile")}</div>
          <button onClick={this._refresh}>Refresh</button>

        </div>





        <div id="manual-send">
          <br/>
          Commande des objets
          <br/>


          <button onClick={this._manualSend}>Send</button>


              <select id="from" defaultValue="!11">
                <option value="!11">!11</option> 
              </select>

              <select id="to" defaultValue=":hub">
                <option value=":hub">Hub</option> 
                <option value=":pistol" >Pistol</option>
                <option value=":wizbla">Wizbla</option>
                <option value=":glove">Gant</option>
                <option value=":grimoire">Grimoire</option>
              </select>

              <select id="param" defaultValue="beenShot">
                <option value="poisoned">poisoned</option>
                <option value="onFire" >onFire</option>
                <option value="beenShot" >beenShot</option>
                <option value="shield" >shield</option>
                <option value="shieldShot" >shieldShot</option>
                <option value="healed" >healed</option>
                <option value="health" >health (at)</option>
                <option value="shootFB" >shootFB</option>
                <option value="sightFB" >sightFB</option>
                <option value="!sightFB" >!sightFB</option>
              </select>

              <input id="value" type="number" defaultValue="1"></input>


          
        </div>




        <div id="manual-event">
          <br/>
            <button onClick={this._newEvent}>New event</button>
          <br/>

          <textarea id="eventText" rows="3" cols="50"> 
            {
              '{"FROM": "Dreadbond","TO": "Dreadbond","TYPE": "damage","VALUE": "20"'
            }
            {/* http://objgen.com/json */}

          </textarea>
        </div>

        <div id="manual-hub">
          <br/>
            <button onClick={this._newHubEvent}>New hub event</button>
          <br/>

          <textarea id="manualHubText" rows="3" cols="50"> 
            {
              '{"to": "!11","from": ":grimoire","param": "fire","value": "1"}'
            }
            {/* http://objgen.com/json */}

          </textarea>
        </div>
        </div>
      </div>
      );
  }
}


App.propTypes = {
  tasks: PropTypes.array.isRequired,
  stats: PropTypes.array.isRequired,
};


export default createContainer(() => {  
  return {
    tasks: World.find({}).fetch(),
    stats: Player.find({}).fetch(),
  };  
}, App);