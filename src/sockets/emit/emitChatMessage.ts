import { io } from "../../../app";

export default function emitChatMessage(room: string, json: string){
    io.to(room).emit('chat message',json)
}