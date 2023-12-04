import {  Socket } from "socket.io";
import { handleUserRoomDisconection } from "../../redis/redis";
// import emitGetRooms from "../emit/emitGetRoom";
// import getUsersRoom from "./getUsersRoom";
// import emitUsersRoom from "../emit/emitUsersRoom";
import emitUpdateUserList from "../emit/emitUpdateUserList";
export default function disconnection(socket: Socket, redis: any): void{
    socket.on('disconnect', ():void => {
      const rooms = ['general', 'room1', 'room2']
      handleUserRoomDisconection(redis,rooms,{id:socket.id,username: socket.data.username})
      
      rooms.forEach((room)=> {socket.leave(room)
        emitUpdateUserList( redis,room)})
        console.log(`${socket.data.username} disconected`);

      });
}