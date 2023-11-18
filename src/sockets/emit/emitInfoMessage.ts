import { Server, Socket } from "socket.io";
import { io } from "../../../app";


export default function emitInfoMessage(socket: Socket, msg: string):void{
    io.to(socket.id).emit('info message', msg)
}