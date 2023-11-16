import {  Socket } from "socket.io";
import { randomColor } from "../functions/randomColor"
import { io } from "../../app";

export default function joinRoom(socket: Socket): void{
    socket.on('joinRoom',(roomName: string): void=>{
        if(roomName==="first" || roomName=== "second"){
          socket.join(roomName)
      }
      io.to(socket.id).emit('chat message', `Welcome to '${roomName}' channel`)
        
      })
}
