import {Client, Room} from "colyseus.js"


export class ChatRoom{
    private client: Client;
    private room: any 
    private chatBox: HTMLElement = document.getElementById("chat-box");
    private chatInput: HTMLElement = document.getElementById("chat-input");
    private chatForm: HTMLElement = document.getElementById("chat-form");

    constructor(client: Client) {
        this.client = client;
        this.initJoinOrCreateRoom(this.client);
        this.onsend(this.chatForm, <HTMLInputElement> this.chatInput );
        this.onMessage(this.chatBox);
    };

    private initJoinOrCreateRoom(client: Client) {
        this.room = this.client.joinOrCreate("Chat")

        this.room.then(r => {
            console.log(r.sessionId, "joined", r.name);
        }); 
    }

    private onsend(chatForm: HTMLElement, chatInput:HTMLInputElement) {
        this.room.then(r => {
            chatForm.onsubmit = function(e){
                e.preventDefault();
                r.send("message", chatInput.value);
                chatInput.value = ' ';
            }
        }); 
    }

    private onMessage(chatBox: HTMLElement){
        this.room.then(r => {
            r.onMessage("messages", function(message) {
                let xH = chatBox.scrollHeight;
                chatBox.innerHTML += '<p>' + message + '</p>';
                chatBox.scrollTo(0,xH);
            });
            
        });
    }
    
}