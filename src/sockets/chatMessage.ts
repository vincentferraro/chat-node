import {  Socket, Server } from "socket.io";
import handleMessage from "../functions/handleMessage";
import setUsername from "./setUsername";


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
            }
          const string = handleMessage(socket.data.username,msg)
          io.emit('chat message',string)
      });
}