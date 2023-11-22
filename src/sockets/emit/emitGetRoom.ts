

import { Socket } from "socket.io";
import { io } from "../../../app";

export default async function emitGetRooms(socket : Socket, rooms : Array<string>){
    try{
        io.to(socket.id).emit('get rooms', rooms)
    }catch(err){
        console.error('ERROR emitGetRoom function', err)
    }
}