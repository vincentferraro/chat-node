import { Socket } from "socket.io"
import { io } from "../../app"
import emitInfoMessage from "./emit/emitInfoMessage"
export default function setUsername(socket:Socket): void{
    socket.on('setUsername',(username:string)=>{
        try{
            socket.data.username = username
            console.log(`A user has updated their username : ${socket.data.username}`)
            emitInfoMessage(socket,`You username has been update to : ${socket.data.username}`)
            
        }catch(err){
            console.error('Error setUsername function:', err)
        }
        
    })

}