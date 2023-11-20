import {  Socket} from "socket.io";
import handleMessage from "../functions/handleMessage";
import emitChatMessage from "./emit/emitChatMessage";
import { Data } from "../interfaces/message";

import General from "../db/Models/general";

export default  function chatMessage(socket: Socket):void{

    socket.on('chat message', async (data: Data) => {
        try{
            const jsonStringify: string = JSON.stringify(handleMessage(socket.data.username,data))
            const message = new General({
                userId: 'clientEmit',
                date : new Date().toLocaleString(),
                message: data.message

            })
            await message. save()
            console.log(message)
            emitChatMessage(data.room, jsonStringify)
        }catch(err){
            console.error('Error handle chat message: ', err)
        }
                
      });
}