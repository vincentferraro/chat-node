import { Socket } from "socket.io"
import { io } from "../../app"
import { getRedis } from "../redis/redis"
import getGeneralPreviousDocuments from "../db/functions/getPreviousDocument"
import emitPreviousMessage from "./emit/emitPreviousMessage"
import { IMessageDocument } from "../interfaces/IMessageDocument"
// When user join room, user get previous messages history

export default async function previousMessage(socket: Socket, redis:any){
    try{
        socket.on('get previous messages', async (roomName)=>{
            const previousMessage= await getRedis(redis,'history',roomName) as Array<IMessageDocument>
            emitPreviousMessage(socket,previousMessage)
        })
       
    }catch(err){
        console.error('Error previousMessage function :', err)
    }
}