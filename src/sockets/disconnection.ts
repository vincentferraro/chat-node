import {  Socket } from "socket.io";

export default function disconnection(socket: Socket): void{
    socket.on('disconnect', ():void => {
        console.log(`${socket.data.username} disconected`);
      });
}