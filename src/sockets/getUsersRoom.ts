import { Socket,  } from "socket.io"
import getUsersRooms from "../functions/getUsersRoom"
import emitUsersRoom from "./emit/emitUsersRoom"
export default async function  getUsersRoom(socket : Socket){
   
    socket.on('getUsersRoom', async(roomName)=>{
        const listUsers = await getUsersRooms(roomName)       
        emitUsersRoom(socket,listUsers)
    })
}
