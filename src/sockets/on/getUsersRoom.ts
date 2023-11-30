import { Socket,  } from "socket.io"
import emitUsersRoom from "../emit/emitUsersRoom"
import { Username } from "../../interfaces/username"
import { getRedis } from "../../redis/redis"
export default async function  getUsersRoom(socket : Socket, redis: any){
    socket.on('get users room', async(roomName)=>{
        const listUsers = await getRedis(redis, 'user', roomName)
        
        emitUsersRoom(socket,listUsers as Array<Username>)
    })
}
