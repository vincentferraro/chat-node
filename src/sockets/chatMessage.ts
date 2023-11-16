import {  Socket, Server } from "socket.io";
import handleMessage from "../functions/handleMessage";
import setUsername from "./setUsername";
import leaveRoom from "./leaveRoom";
import joinRoom from "./joinRoom";

export default function chatMessage(socket: Socket, io: Server):void{

    socket.on('chat message', async (msg: string) => {
        // console.log(msg.toString().trim())
            
            if(msg.toString().trim()==='rooms'){
                const sockets = await io.fetchSockets();
                console.log('ok',socket.data)
                for(const socket of sockets){
                    console.log(socket.data.username)
                }
            }else if(msg.toString().trim()==='getUsersRoom general'){
                const sockets = await io.in("general").fetchSockets();
                for(const socket of sockets){
                    console.log(socket.data.username)
                }
            }else if(msg.toString().trim().includes('username')){
                const username = msg.toString().trim().split(' ')
                console.log(username[1])
                socket.data.username = username[1]
            }else if(msg.toString().trim().includes('leaveRoom')){
                const room = msg.toString().trim().split(' ')
                console.log(room[1])
                socket.leave(room[1])
            }else if(msg.toString().trim().includes('joinRoom')){
                const room = msg.toString().trim().split(' ')
                console.log(room[1])
                if(room[1]==="first" || room[1]=== "second"){
                    socket.join(room[1])
                }
                
            }else{
                const string = handleMessage(socket.data.username,msg)
                io.emit('chat message',string)
            }
          
      });
}