import { Socket } from "socket.io"

export default function setUsername(socket:Socket): void{
    socket.on('setUsername',(username:string)=>{
        socket.data.username = username
        console.log(`A user set his username : ${socket.data.username}`)

    })

}