import {  Socket } from "socket.io";
import emitInfoMessage from "../emit/emitInfoMessage";
import { addRedis } from "../../redis/redis";
import emitUpdateUserList from "../emit/emitUpdateUserList";
export default function joinRoom(socket: Socket, redis: any): void{
    socket.on('join room',(roomName: string): void=>{
        try{
            if(roomName === "general" ||roomName==="room1" || roomName=== "room2"){

                // A User join a room
                socket.join(roomName)
                
                // Add User in the REDIS CACHE
                addRedis(redis,'user',roomName,{id:socket.id, username:socket.data.username})

                // Inform all sockets that a User has joined the room

                emitUpdateUserList(redis, roomName)
                
                // MESSAGE SERVER
                emitInfoMessage(socket, `Welcome to '${roomName}' channel`)  
            }
        }catch(err){
            console.error('Error join room function: ', err)
        }
        
      })
}
