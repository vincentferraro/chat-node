
import { Socket } from "socket.io"
import { Username } from "../../interfaces/username"
import { io } from "../../../app"

export default function emitUsersRoom(socket: Socket, list :Array<Username>):void{
    io.to(socket.id).emit('getUsersRoom', list)
}