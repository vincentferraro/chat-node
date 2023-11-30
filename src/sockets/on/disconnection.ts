import {  Socket } from "socket.io";
import { handleUserRoomDisconection } from "../../redis/redis";
import emitGetRooms from "../emit/emitGetRoom";
import getUsersRoom from "./getUsersRoom";
import emitUsersRoom from "../emit/emitUsersRoom";

export default function disconnection(socket: Socket, client: any): void{
    socket.on('disconnect', ():void => {
      const rooms = ['general', 'room1', 'room2']
      handleUserRoomDisconection(client,rooms,{id:socket.id,username: socket.data.username})
      rooms.forEach((room)=> socket.leave(room))
        console.log(`${socket.data.username} disconected`);

      });
}