import { Socket } from "socket.io";
import { io } from "../../../app";
import { IMessageDocument } from "../../interfaces/IMessageDocument";
import { Username } from "../../interfaces/username";
export default async function emitPreviousMessage(socket: Socket, previousMessage :Array<IMessageDocument|Username> ):Promise<void>{
    try{
        io.to(socket.id).emit('get previous messages', previousMessage)
    }catch(err){
        console.error('ERROR emitPreviousMessage function :', err)
    }

}