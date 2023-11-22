import { Server, Socket } from "socket.io";
//
// SOCKETS FUNCTIONS
//
import  joinRoom  from "./joinRoom";
import  leaveRoom  from "./leaveRoom";
import disconnection  from "./on/disconnection";
import chatMessage from "./on/chatMessage";
import setUsername from "./setUsername";
import getUsersRooms from "./on/getUsersRoom";
import getRooms from "./on/getRooms";
import initialization from "./initialization";
import { randomColor } from "../functions/randomColor";
import previousMessage from "./previousMessages";


export default async function serverSocket(io:Server , redis : any){

    // REDIS CONNECTION

    io.on('connection', async (socket: Socket) => {
        
        
        socket.data.color = randomColor()
        
        //
        // Initialization
        //
        initialization(socket, redis)
        

        previousMessage(socket, redis)
        //
        // Set Username
        //
        setUsername(socket,redis)
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
        chatMessage(socket, redis)
        //
        // GET ROOMS
        //
        getRooms(socket)
      });
}


  