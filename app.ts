import express, { Express} from "express";
import { createServer, Server as serv} from 'http'
import { Server, Socket } from "socket.io";


//
// IMPORT FUNCTIONS
//

// import { randomName }  from "./src/functions/randomName";
import { randomColor } from "./src/functions/randomColor";

//
// SOCKETS FUNCTIONS
//
import  joinRoom  from "./src/sockets/joinRoom";
import  leaveRoom  from "./src/sockets/leaveRoom";
import disconnection  from "./src/sockets/disconnection";
import chatMessage from "./src/sockets/chatMessage";
import setUsername from "./src/sockets/setUsername";
import getUsersRooms from "./src/sockets/getUsersRoom";




// import { join } from 'path'

//
// FUNCTIONS
//

// const setName= randomName()


// Creating Server

const app : Express = express()
const httpServer: serv = createServer(app)
const host: string = 'localhost'
// const host: string = 'localhost';
const port: number = 4000;
const io: Server = new Server(httpServer,{
  cors: {
          origin: "http://localhost:3000"
        },
  connectionStateRecovery:{}
}
  )


// APP


// io.socketsJoin("general")

//
// MIDDLEWARES
//

//
// STATES
//


// ON CONNECTION
io.on('connection', async (socket: Socket) => {
    
    console.log(`User connected`)

  
    socket.join('general')
    socket.data.color = randomColor()
    
    io.to(socket.id).emit('welcome', `Hi ${socket.data.username}, Welcome to COLLOC-CHAT.`)
   
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


httpServer.listen(port,host,()=>{
    console.log(`Server launched on http://${host}:${port}`)
})

export { io }