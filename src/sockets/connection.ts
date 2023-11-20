import { Server, Socket } from "socket.io";
//
// SOCKETS FUNCTIONS
//
import  joinRoom  from "./joinRoom";
import  leaveRoom  from "./leaveRoom";
import disconnection  from "./disconnection";
import chatMessage from "./chatMessage";
import setUsername from "./setUsername";
import getUsersRooms from "./getUsersRoom";

import { randomColor } from "../functions/randomColor";
import previousMessage from "./previousMessages";


export default async function serverSocket(io:Server){
    io.on('connection', async (socket: Socket) => {
    
        console.log(`User connected`)
    
      
        socket.join('general')
        socket.data.color = randomColor()
        
        io.to(socket.id).emit('welcome', `Hi ${socket.data.username}, Welcome to COLLOC-CHAT.`)

        previousMessage(socket)
        //
        // Set Username
        //
        setUsername(socket)
        //
        // JOIN ROOM
        //
        joinRoom(socket)
        //
        // GET SOCKET
        //
        getUsersRooms(socket)
        //
        // ON DISCONNECT
        //
        disconnection(socket)
        //
        // ON CHAT MESSAGE
        //
        chatMessage(socket)
      });
}


  