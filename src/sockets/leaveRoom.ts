import { Socket, Server } from "socket.io";


export default function leaveRoom(socket: Socket, redis: any):void{
    socket.on('leave room',(roomName)=>{
        try{
            if(roomName==="first" || roomName=== "second"){
                
                socket.leave(roomName)
                redis.sRem(`user:room:${roomName}`,JSON.stringify({id:socket.id, username: socket.data.username}))
            }

        }catch(err){
            
            console.error('Error leave room function: ', err)
            
        }
        
    })
}