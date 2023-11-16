import {  Socket, Server } from "socket.io";
import handleMessage from "../functions/handleMessage";
import setUsername from "./setUsername";
import leaveRoom from "./leaveRoom";
import joinRoom from "./joinRoom";
import handleCommand from "../functions/handleCommand";
export default function chatMessage(socket: Socket, io: Server):void{

    socket.on('chat message', async (msg: string) => {
        // console.log(msg.toString().trim())
            if(msg.toString().trim().startsWith("/")){
                handleCommand(msg,socket)
            }else{
                const string = handleMessage(socket.data.username,msg)
                io.emit('chat message',string)
            }
          
      });
}