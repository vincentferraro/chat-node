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

import { redisConnection } from "../redis/redis";


export default async function serverSocket(io:Server){

    // REDIS CONNECTION

    const client = await redisConnection()

    io.on('connection', async (socket: Socket) => {
        
        socket.on('initialization',(username)=>{

          // Initialize redisValue to store in REDIS CACHE

          const redisValue = JSON.stringify({
            id:socket.id,
            username: username
          })

          socket.data.username= username

          client.sAdd('room:general',redisValue)
          socket.join('general')
          io.to(socket.id).emit('welcome', `Hi ${socket.data.username}, Welcome to COLLOC-CHAT.`)
        })
        

        socket.data.color = randomColor()
        
        

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
        disconnection(socket, client)
        //
        // ON CHAT MESSAGE
        //
        chatMessage(socket)
      });
}


  