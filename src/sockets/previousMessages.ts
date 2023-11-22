import { Socket } from "socket.io"
import { io } from "../../app"
import { getRedis } from "../redis/redis"
import getGeneralPreviousDocuments from "../db/functions/getPreviousDocument"
// When user join room, user get previous messages history

export default async function previousMessage(socket: Socket, redis:any){
    try{
        socket.on('get previous messages', async (roomName)=>{
            console.log('ici')
            const previousMessage = await getRedis(redis,'history',roomName)
            io.to(socket.id).emit('get previous messages', previousMessage)
        })
       
    }catch(err){
        console.error('Error previousMessage function :', err)
    }
}