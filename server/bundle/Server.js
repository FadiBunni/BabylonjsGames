"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const colyseus_1 = require("colyseus");
const ChatRoom_1 = require("./src/ChatRoom");
const port = Number(process.env.PORT || 8080);
const app = express_1.default();
const gameServer = new colyseus_1.Server({
    server: http_1.createServer(app)
});
gameServer.define("Chat", ChatRoom_1.ChatRoom).enableRealtimeListing;
gameServer.onShutdown(function () {
    console.log("game server is going down.");
});
gameServer.listen(port);
console.log("listening on http://localhost:" + port);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLCtCQUFvQztBQUNwQyx1Q0FBa0M7QUFDbEMsNkNBQTBDO0FBRTFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztBQUM5QyxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFdEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzFCLE1BQU0sRUFBRSxtQkFBWSxDQUFDLEdBQUcsQ0FBQztDQUM1QixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxtQkFBUSxDQUFDLENBQUMscUJBQXFCLENBQUM7QUFFMUQsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsSUFBSSxDQUFDLENBQUMifQ==