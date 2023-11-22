import {  Socket } from "socket.io";
import { handleUserRoomDisconection } from "../redis/redis";

export default function disconnection(socket: Socket, client: any): void{
    socket.on('disconnect', ():void => {
      const rooms = ['general', 'first', 'second']
      handleUserRoomDisconection(client,rooms,{id:socket.id,username: socket.data.username})
        console.log(`${socket.data.username} disconected`);

      });
}