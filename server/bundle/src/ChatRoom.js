"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoom = void 0;
const colyseus_1 = require("colyseus");
class ChatRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 4;
    }
    onCreate(options) {
        console.log("ChatRoom created!", options);
        console.log(this);
        this.onMessage("message", (client, message) => {
            console.log("ChatRoom received message from", client.sessionId, ":", message);
            this.broadcast("messages", `(${client.sessionId}) ${message}`);
            console.log(message);
        });
    }
}
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdFJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ2hhdFJvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXNDO0FBS3RDLE1BQWEsUUFBUyxTQUFRLGVBQUk7SUFBbEM7O1FBRUksZUFBVSxHQUFHLENBQUMsQ0FBQztJQXNDbkIsQ0FBQztJQW5DRyxRQUFRLENBQUMsT0FBWTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztDQXlCSjtBQXhDRCw0QkF3Q0MifQ==