import { Socket } from "socket.io";
import { removeRedis } from "../../redis/redis";
import emitInfoMessage from "../emit/emitInfoMessage";


export default function leaveRoom(socket: Socket, redis: any):void{
    socket.on('leave room',(roomName)=>{
        try{
            if(roomName==="first" || roomName=== "second"){
                
                socket.leave(roomName)
                removeRedis(redis,'user',roomName,{id:socket.id, username: socket.data.username})
                emitInfoMessage(socket,`${socket.data.username} has leaved '${roomName}'room`)
            }

        }catch(err){
            
            console.error('Error leave room function: ', err)
            
        }
        
    })
}