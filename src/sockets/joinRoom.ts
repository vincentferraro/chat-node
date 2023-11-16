import {  Socket } from "socket.io";
import { randomColor } from "../functions/randomColor"

export default function joinRoom(socket: Socket): void{
    socket.on('joinRoom',(roomName: string): void=>{

        // Attribute a color to the User
        // console.log('ici', roomName, socket.data.username)
        const color = randomColor()
        socket.data.color=color
        socket.join(roomName)
        
      })
}
