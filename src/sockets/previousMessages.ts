import { Socket } from "socket.io"
import { io } from "../../app"

import getGeneralPreviousDocuments from "../db/functions/getPreviousDocument"
// When user join room, user get previous messages history

export default async function previousMessage(socket: Socket){
    try{
        socket.on('get previous messages', async ()=>{
            const previousMessage = await getGeneralPreviousDocuments()
            io.to(socket.id).emit('previous messages', previousMessage)
        })
       
    }catch(err){
        console.error('Error previousMessage function :', err)
    }
}