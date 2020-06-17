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
        });
    }
    onAuth(client, options, request) {
    }
    onJoin(client, options, auth) {
    }
    onLeave(client, consented) {
    }
    onDispose() { }
}
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZVJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvR2FtZVJvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXNDO0FBS3RDLE1BQWEsUUFBUyxTQUFRLGVBQUk7SUFBbEM7O1FBRUksZUFBVSxHQUFHLENBQUMsQ0FBQztJQW9DbkIsQ0FBQztJQWpDRyxRQUFRLENBQUMsT0FBWTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQVksRUFBRSxPQUE2QjtJQUVsRSxDQUFDO0lBR0QsTUFBTSxDQUFFLE1BQWMsRUFBRSxPQUFZLEVBQUUsSUFBUztJQUUvQyxDQUFDO0lBR0QsT0FBTyxDQUFDLE1BQWMsRUFBRSxTQUFrQjtJQUUxQyxDQUFDO0lBR0QsU0FBUyxLQUFJLENBQUM7Q0FPakI7QUF0Q0QsNEJBc0NDIn0=