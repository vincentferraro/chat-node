import { Server, Socket } from "socket.io";
import { randomColor } from "../functions/randomColor"

export default function joinRoom(socket: Socket,roomUsers: any): void{
    socket.on('joinRoom',(roomName: string | Array<string>): void=>{

        // Attribute a color to the User
        // console.log('ici', roomName, socket.data.username)
        const color = randomColor()
    
        if(!roomUsers.has(roomName)){
          roomUsers.set(roomName,[])
        }
        socket.join(roomName)
        roomUsers.get(roomName).push({id:socket.id,name:socket.data.username, color: color})
        console.log("Room setting up successfully", roomUsers)
      })
}
