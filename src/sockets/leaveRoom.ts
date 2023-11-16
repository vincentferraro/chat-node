import { Socket, Server } from "socket.io";


export default function leaveRoom(socket: Socket):void{
    socket.on('leaveRoom',(roomName)=>{
        socket.leave(roomName)
    })
}