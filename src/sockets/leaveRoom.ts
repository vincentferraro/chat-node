import { Socket, Server } from "socket.io";


export default function leaveRoom(socket: Socket):void{
    socket.on('leave room',(roomName)=>{
        try{
            if(roomName==="first" || roomName=== "second"){
                socket.leave(roomName)
            }

        }catch(err){
            
            console.error('Error leave room function: ', err)
            
        }
        
    })
}