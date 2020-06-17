import express from "express";
import { createServer } from "http";
import { Server } from "colyseus";
import { ChatRoom } from "./src/ChatRoom";

const port = Number(process.env.PORT || 8080);
const app = express();

const gameServer = new Server({
    server: createServer(app)
});


gameServer.define("Chat", ChatRoom).enableRealtimeListing;



gameServer.onShutdown(function(){
    console.log("game server is going down.");
});

gameServer.listen(port);

console.log("listening on http://localhost:" + port);



