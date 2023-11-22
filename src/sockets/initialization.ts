import { Socket } from "socket.io";
import { io } from "../../app";
import { addRedis } from "../redis/redis";
import emitInfoMessage from "./emit/emitInfoMessage";

export default async function initialization(socket: Socket, redis: any): Promise<void>{
    try{
        socket.on('initialization',(username)=>{

            // Initialize redisValue to store in REDIS CACHE
            
            socket.data.username=username
            socket.join('general')
            addRedis(redis,'user','general',{id:socket.id,username:socket.data.username})
            emitInfoMessage(socket,`Welcome ${socket.data.username} to COLLOC-CHAT`)
          })
    }catch(err){
        console.error('ERROR initialization function', err)
    }
}