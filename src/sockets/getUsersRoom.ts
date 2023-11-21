import { Socket,  } from "socket.io"
import getUsersRooms from "../functions/getUsersRoom"
import emitUsersRoom from "./emit/emitUsersRoom"
import { Username } from "../interfaces/username"

export default async function  getUsersRoom(socket : Socket, redis: any){
    socket.on('get users room', async(roomName)=>{
        const listUsers = await redis.sMembers(`room:${roomName}`)
        // const listUsers = await getUsersRooms(roomName)     
        console.log(listUsers)  
        emitUsersRoom(socket,listUsers as Array<Username>)
    })
}
