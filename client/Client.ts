import * as OIMO from "oimo";
import * as BABYLON from "babylonjs";
import * as Colyseus from "colyseus.js"
import {Game} from "./Game";


//Initialize Game
window.addEventListener('DOMContentLoaded', () => {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            if (BABYLON.Engine.isSupported()) {
                new Game('renderCanvas',OIMO);
            }
            let client = new Colyseus.Client("ws://localhost:8080");

            client.joinOrCreate("Chat").then(room => {
                console.log("joined chat room");
                room.onStateChange.once(function(state){
                    console.log("initial room state:", state);
                });

                room.send("message", "hello from client");

                room.onMessage("messages", function(message) {
                    console.log(message);
                });
            }); 
            
            
        }
    }
});
