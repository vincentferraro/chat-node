import { Socket, Server } from "socket.io"
export default async function  getSocket(socket : Socket){
   
    socket.on('getUsersRoom', (roomName)=>{
        
        console.log('ICI')
        // console.log('THE SOCKET',socket)
        // io.to(socket.rooms).emit('getSockets',roomUsers.get(socket.roomsName))
        
    })
}
