import { Socket,  } from "socket.io"
import emitUsersRoom from "../emit/emitUsersRoom"
import { Username } from "../../interfaces/username"

export default async function  getUsersRoom(socket : Socket, redis: any){
    socket.on('get users room', async(roomName)=>{
        const listUsers = await redis.sMembers(`user:room:${roomName}`)
        emitUsersRoom(socket,listUsers as Array<Username>)
    })
}
