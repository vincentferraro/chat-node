import { Socket, Server } from "socket.io";


export default function leaveRoom(socket: Socket):void{
    socket.on('leaveRoom',(roomName)=>{
        if(roomName==="first" || roomName=== "second"){
            socket.leave(roomName)
        }
    })
}