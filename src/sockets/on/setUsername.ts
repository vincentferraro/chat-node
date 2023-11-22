import { Socket } from "socket.io"
import emitInfoMessage from "../emit/emitInfoMessage"
import { updateRedis } from "../../redis/redis"
import getSocketRoom from "../functions/getSocketRoom"


export default function setUsername(socket:Socket, redis:any): void{
    socket.on('setUsername',(username:string)=>{
        try{
            const previousUsername = socket.data.username
            socket.data.username = username
            const rooms = getSocketRoom(socket) as Array<string>

            // For update redis cache, we add in parameter the previous and the new stringify
            updateRedis(redis,'user',rooms,{id:socket.id, username: previousUsername},{id:socket.id, username:socket.data.username})
            
            console.log(`A user has updated their username : ${socket.data.username}`)
            emitInfoMessage(socket,`You username has been update to : ${socket.data.username}`)

        }catch(err){
            console.error('Error setUsername function:', err)
        }
        
    })

}