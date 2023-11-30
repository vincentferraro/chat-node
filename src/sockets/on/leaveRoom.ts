import { Socket } from "socket.io";
import { removeRedis } from "../../redis/redis";
import emitInfoMessage from "../emit/emitInfoMessage";
import emitUpdateUserList from "../emit/emitUpdateUserList";


export default function leaveRoom(socket: Socket, redis: any):void{
    socket.on('leave room',(roomName)=>{
        try{
            if(roomName==="room1" || roomName=== "room2"){
                
                // Leave the room
                socket.leave(roomName)

                // Remove the USER in the REDIS CACHE
                removeRedis(redis,'user',roomName,{id:socket.id, username: socket.data.username})

                // Emit message for All Users to inform a user has leaved the room
                emitUpdateUserList(redis,roomName)

                // Server Message
                emitInfoMessage(socket,`${socket.data.username} has leaved '${roomName}'room`)

            }

        }catch(err){
            
            console.error('Error leave room function: ', err)
            
        }
        
    })
}