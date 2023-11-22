import { Socket } from "socket.io"
import { io } from "../../../app"
import emitGetRooms from "../emit/emitGetRoom"
import getSocketRoom from "../functions/getSocketRoom"
export default async function getRooms(socket: Socket){
    try{
        socket.on('get rooms',()=>{
            const arrayRooms = getSocketRoom(socket) as Array<string>
            emitGetRooms(socket, arrayRooms)
        
        })
        
    }catch(err){
        console.error(' ERROR getRooms function', err)
    }
        
}