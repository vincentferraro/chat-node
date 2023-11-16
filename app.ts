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
import  getSocket  from "./src/sockets/getSocket";




// import { join } from 'path'

//
// FUNCTIONS
//

// const setName= randomName()


// Creating Server

const app : Express = express()
const httpServer: serv = createServer(app)
const port: number = 4000
const host: string = 'http://localhost'
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

// io.use((socket:Socket ,next: Function): void=>{
//   socket.join("General")
//   // console.log('A user connected', socket.rooms);
//   socket.data.username= setName()
//   next()
// })

//
// STATES
//

const roomUsers = new Map()

// ON CONNECTION
io.on('connection', async (socket: Socket) => {
    
    console.log(`User connected`)

    // io.emit("welcome","Hello from APP.TS")
  
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
    getSocket(socket)
    //
    // ON DISCONNECT
    //
    disconnection(socket)


    //
    // ON CHAT MESSAGE
    //
    chatMessage(socket, io)
    


  });


httpServer.listen(port,()=>{
    console.log(`Server launched on http://localhost:${port}`)
})

export { io }