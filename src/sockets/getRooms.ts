import { Socket } from "socket.io"
import { io } from "../../app"
import emitGetRooms from "./emit/emitGetRoom"

export default async function getRooms(socket: Socket){
    try{
        socket.on('get rooms',()=>{
            const roomsList = ["general","first","second"]
            const arrayRooms: Array<string> = []
            socket.rooms.forEach(element=>{
                roomsList.forEach(room => {
                    if(room.includes(element)){
                        arrayRooms.push(element)
                    }
                })
            })
            emitGetRooms(socket, arrayRooms)
        
        })
        
    }catch(err){
        console.error(' ERROR getRooms function', err)
    }
        
}