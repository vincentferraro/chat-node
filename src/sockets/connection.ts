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
import getRooms from "./getRooms";
import initialization from "./initialization";
import { randomColor } from "../functions/randomColor";
import previousMessage from "./previousMessages";

import { createClient } from "redis";



export default async function serverSocket(io:Server){

    // REDIS CONNECTION

    const redis = await createClient().connect()

    io.on('connection', async (socket: Socket) => {
        
        
        

        socket.data.color = randomColor()
        
        //
        // Initialization
        //
        initialization(socket, redis)
        

        previousMessage(socket)
        //
        // Set Username
        //
        setUsername(socket)
        //
        // JOIN ROOM
        //
        joinRoom(socket, redis)
        //
        // GET SOCKET
        //
        getUsersRooms(socket, redis)
        //
        // ON DISCONNECT
        //
        disconnection(socket, redis)
        //
        // ON CHAT MESSAGE
        //
        chatMessage(socket)
        //
        // GET ROOMS
        //
        getRooms(socket)
      });
}


  