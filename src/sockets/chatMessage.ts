import {  Socket, Server } from "socket.io";
import handleMessage from "../functions/handleMessage";


export default function chatMessage(socket: Socket, io: Server):void{

    socket.on('chat message', (msg: string): void => {
        console.log(msg.toString().trim())
          const string = handleMessage(socket.data.username,msg)
          io.emit("message",string)
      });
}