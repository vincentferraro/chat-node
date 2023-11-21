import { Socket } from "socket.io"
import { io } from "../../app"


export default async function getRooms(socket: Socket){
    try{
        socket.on('get rooms',()=>{
            const roomsList = ["general","first","second"]
            const arrayRooms: Array<String> = []
            socket.rooms.forEach(element=>{
                roomsList.forEach(room => {
                    if(room.includes(element)){
                        arrayRooms.push(element)
                    }
                })
            })
        io.to(socket.id).emit('get rooms', arrayRooms)
        })
        
    }catch(err){
        console.error(' ERROR getRooms function', err)
    }
        
}