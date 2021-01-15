import {Client} from "colyseus.js"

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

        this.room.then((M:any) => {
            console.log(M.sessionId, "joined", M.name);
        }); 
    }

    private onsend(chatForm: HTMLElement, chatInput:HTMLInputElement) {
        //prevent moving game while typing in chat both for keydown and keyup.
        chatInput.addEventListener('keydown',function(e){
            e.stopPropagation();
        });

        chatInput.addEventListener('keyup',function(e){
            e.stopPropagation();
        });

        this.room.then((m:any) => {
            chatForm.onsubmit = function(e){
                e.preventDefault();
                m.send("message", chatInput.value);
                chatInput.value = ' ';

                //unfocus the input box
                chatInput.blur();
            }
        }); 
    }

    private onMessage(chatBox: HTMLElement){
        this.room.then((M:any) => {
            M.onMessage("messages", function(message:any) {
                let xH = chatBox.scrollHeight;
                chatBox.innerHTML += '<p>' + message + '</p>';
                chatBox.scrollTo(0,xH);
            });
            
        });
    }
    
}