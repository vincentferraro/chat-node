import { Socket } from "socket.io"
import { io } from "../../app"
export default function setUsername(socket:Socket): void{
    socket.on('setUsername',(username:string)=>{
        socket.data.username = username
        console.log(`A user has updated their username : ${socket.data.username}`)
        io.to(socket.id).emit('chat message', `You username has been update to : ${socket.data.username}`)

    })

}