import {Room, Client} from 'colyseus';
import http from 'http';
import { anaglyphPixelShader } from 'babylonjs/Shaders/anaglyph.fragment';


export class ChatRoom extends Room {

    maxClients = 4;

    // When room is initialized
    onCreate(options: any){
        console.log("ChatRoom created!", options);
        console.log(this);

        this.onMessage("message", (client, message) => {
            console.log("ChatRoom received message from: ", client.sessionId, ":", message);
            this.broadcast("messages", "proadcast: " + `(${client.sessionId}) ${message}`);
        });
        
    }
    
    // // Authorize client based on provided options before WebSocket handshake is complete
    // onAuth(client: Client, options: any, request: http.IncomingMessage){

    // }

    // // When client successfully join the room
    // onJoin (client: Client, options: any, auth: any){

    // }

    // // When a client leaves the room
    // onLeave(client: Client, consented: boolean) {

    // }

    // // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    // onDispose() {}






}