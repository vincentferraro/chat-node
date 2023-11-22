import {  Socket } from "socket.io";
import emitInfoMessage from "../emit/emitInfoMessage";
import { addRedis } from "../../redis/redis";
export default function joinRoom(socket: Socket, redis: any): void{
    socket.on('join room',(roomName: string): void=>{
        try{
            if(roomName==="first" || roomName=== "second"){
                socket.join(roomName)
                
                addRedis(redis,'user',roomName,{id:socket.id, username:socket.data.username})
                emitInfoMessage(socket, `Welcome to '${roomName}' channel`)  
            }
        }catch(err){
            console.error('Error join room function: ', err)
        }
        
      })
}
