import { Socket, Server } from "socket.io"
export default async function  getSocket(socket : Socket, io: Server, roomUsers:any){
    // const roomName = io.sockets.adapter.rooms[rooms]
    
    console.log('ROOMS:',socket.rooms)
    // console.log(sockets)
    socket.on('getSockets', (socket)=>{
        console.log('THE SOCKET',socket)
        io.to(socket.rooms).emit('roomUsers',roomUsers.get(socket.roomsName))
        // socket.emit('listUsername', )
    })
}
