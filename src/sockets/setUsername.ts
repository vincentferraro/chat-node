import { Socket } from "socket.io"

export default function setUsername(socket:Socket): void{
    socket.on('setUsername',(username:string)=>{
        console.log(username)
        socket.data.username = username
        console.log(`A user has updated their username : ${socket.data.username}`)

    })

}