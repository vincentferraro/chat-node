import { Socket } from "socket.io"
import { getRedis } from "../../redis/redis"
import emitPreviousMessage from "../emit/emitPreviousMessage"
import { IMessageDocument } from "../../interfaces/IMessageDocument"
// When user join room, user get previous messages history

export default async function previousMessage(socket: Socket, redis:any){
    try{
        socket.on('get previous messages', async (roomName)=>{
            const previousMessage= await getRedis(redis,'history',roomName) as Array<IMessageDocument>
            console.log(previousMessage)
            emitPreviousMessage(socket,previousMessage)
        })
       
    }catch(err){
        console.error('Error previousMessage function :', err)
    }
}