import { Socket,  } from "socket.io"
import getUsersRooms from "../functions/getUsersRoom"
import emitUsersRoom from "./emit/emitUsersRoom"
import { Username } from "../interfaces/username"
export default async function  getUsersRoom(socket : Socket){
   
    socket.on('get users room', async(roomName)=>{
        const listUsers = await getUsersRooms(roomName)       
        emitUsersRoom(socket,listUsers as Array<Username>)
    })
}
