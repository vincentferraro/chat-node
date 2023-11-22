import { Socket } from "socket.io";
import { io } from "../../app";

export default async function initialization(socket: Socket, redis: any): Promise<void>{
    try{
        socket.on('initialization',(username)=>{

            // Initialize redisValue to store in REDIS CACHE
  
            const redisValue = JSON.stringify({
              id:socket.id,
              username: username
            })
  
            socket.data.username= username
  
            redis.sAdd('user:room:general',redisValue)
            socket.join('general')
            io.to(socket.id).emit('welcome', `Hi ${socket.data.username}, Welcome to COLLOC-CHAT.`)
          })
    }catch(err){
        console.error('ERROR initialization function', err)
    }
}