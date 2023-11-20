import {  Socket } from "socket.io";
import emitInfoMessage from "./emit/emitInfoMessage";
import General from "../db/Models/general";
export default function joinRoom(socket: Socket): void{
    socket.on('join room',(roomName: string): void=>{
        try{
            if(roomName==="general" ||roomName==="first" || roomName=== "second"){
                socket.join(roomName)
                emitInfoMessage(socket, `Welcome to '${roomName}' channel`)  
            }
        }catch(err){
            console.error('Error join room function: ', err)
        }
        
      })
}
