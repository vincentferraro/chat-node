import { Socket,  } from "socket.io"
import { io } from "../../app"
import getUsersRooms from "../functions/getUsersRoom"

export default async function  getUsersRoom(socket : Socket){
   
    socket.on('getUsersRoom', async(roomName)=>{
        const listUsers = await getUsersRooms(roomName)       
            io.to(socket.id).emit('getUsersRoom', listUsers)
    })
}
