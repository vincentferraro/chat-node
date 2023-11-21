import {  Socket } from "socket.io";

export default function disconnection(socket: Socket, client: any): void{
    socket.on('disconnect', ():void => {
        client.sRem('room:general',JSON.stringify({id:socket.id, username: socket.data.username}))
        console.log(`${socket.data.username} disconected`);

      });
}