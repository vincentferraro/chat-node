import { Server, Socket } from "socket.io";
import { randomColor } from "../functions/randomColor"

export default function joinRoom(socket: Socket, io: Server ,roomUsers: any): void{
    socket.on('joinRoom',(roomName: string | Array<string>,username: string): void=>{

        // Attribute a color to the User
    
        const color = randomColor()
    
        if(!roomUsers.has(roomName)){
          roomUsers.set(roomName,[])
        }
        socket.join(roomName)
        roomUsers.get(roomName).push({id:socket.id,name:username, color: color})
    
        io.to(roomName).emit('roomUsers',roomUsers.get(roomName))
      })
}
