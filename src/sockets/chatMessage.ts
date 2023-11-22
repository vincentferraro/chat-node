import {  Socket} from "socket.io";
import handleMessage from "../functions/handleMessage";
import emitChatMessage from "./emit/emitChatMessage";
import { Data } from "../interfaces/message";


import { IMessageDocument } from "../db/interfaces/IMessageDocument";
import createGeneralDocument from "../db/functions/createGeneralDocument";
import { addRedis } from "../redis/redis";
export default  function chatMessage(socket: Socket, redis: any):void{

    socket.on('chat message', async (data: Data) => {
        try{
            
            const jsonStringify: string = JSON.stringify(handleMessage(socket.data.username,data))
            const input: IMessageDocument ={
                userId:socket.id,
                username: socket.data.username,
                room: data.room,
                date:new Date(),
                message: data.message
            }
            // No await because need fastest response from Server to Client
            addRedis(redis,'chat',data.room,input)
            // createGeneralDocument(input)
            emitChatMessage(data.room, jsonStringify)
        }catch(err){
            console.error('Error handle chat message: ', err)
        }
                
      });
}