import {  Socket} from "socket.io";


import emitChatMessage from "./emit/emitChatMessage";
import { Data } from "../interfaces/message";

import { IMessageDocument } from "../interfaces/IMessageDocument";
import { addRedis, handleHistoryCache } from "../redis/redis";

export default  function chatMessage(socket: Socket, redis: any):void{

    socket.on('chat message', async (data: Data) => {
        try{
            const input: IMessageDocument ={
                userId:socket.id,
                username: socket.data.username,
                room: data.room,
                date:new Date(),
                message: data.message
            }
            // No await because need fastest response from Server to Client
            addRedis(redis,'chat',data.room,input)
            handleHistoryCache(redis,data.room,input)
            emitChatMessage(data.room, JSON.stringify(input))
        }catch(err){
            console.error('Error handle chat message: ', err)
        }
                
      });
}