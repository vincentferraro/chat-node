import {  Socket } from "socket.io";
import emitInfoMessage from "./emit/emitInfoMessage";
import General from "../db/Models/general";
export default function joinRoom(socket: Socket): void{
    socket.on('join room',(roomName: string): void=>{
        try{
            console.log(socket.rooms)
            if(roomName==="general" ||roomName==="first" || roomName=== "second"){
                socket.join(roomName)
                // redis.sAdd(`user:room:${roomName}`,)
                emitInfoMessage(socket, `Welcome to '${roomName}' channel`)  
            }
        }catch(err){
            console.error('Error join room function: ', err)
        }
        
      })
}
