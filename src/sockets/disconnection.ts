import {  Socket } from "socket.io";
import { removeRedis } from "../redis/redis";
export default function disconnection(socket: Socket, client: any): void{
    socket.on('disconnect', ():void => {
      removeRedis(client, 'user','general',socket.id,socket.data.username)
        // socket.rooms.forEach(room=>{
        //   console.log('foreach',room)
        //   removeRedis(client, 'user',room,socket.id,socket.data.username)
        //   // client.sRem(`user:room:${room}`,JSON.stringify({id:socket.id, username: socket.data.username}))
        // })
        console.log(`${socket.data.username} disconected`);

      });
}