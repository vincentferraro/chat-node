import { io } from "../../../app"
import { Socket } from "socket.io"
import { Username } from "../../interfaces/username"


export default function emitUsersRoom(socket: Socket, list :Array<Username>):void{
    io.to(socket.id).emit('getUsersRoom', list)
}