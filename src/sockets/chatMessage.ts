import {  Socket} from "socket.io";
import handleMessage from "../functions/handleMessage";
import emitChatMessage from "./emit/emitChatMessage";
import { Data } from "../interfaces/message";


export default function chatMessage(socket: Socket):void{

    socket.on('chat message', (data: Data) => {
        try{
            const jsonStringify: string = JSON.stringify(handleMessage(socket.data.username,data))
            emitChatMessage(data.room, jsonStringify)
        }catch(err){
            console.error('Error handle chat message: ', err)
        }
                
      });
}