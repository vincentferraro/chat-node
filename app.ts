import express, { Express} from "express";
import { createServer, Server as serv} from 'http'
import { Server, Socket } from "socket.io";

//
// FUNCTIONS
//


import { randomName }  from "./src/functions/randomName";

//
// SOCKETS FUNCTIONS
//
import  joinRoom  from "./src/sockets/joinRoom";
import disconnection  from "./src/sockets/disconnection";
import chatMessage from "./src/sockets/chatMessage";
//
// INTERFACES
//
import { Message } from "./src/interfaces/message";
const setName= randomName()

// import { join } from 'path'


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


io.socketsJoin("General")



io.use((socket:Socket ,next: Function): void=>{
  socket.join("General")
  // console.log('A user connected', socket.rooms);
  socket.data.username= setName()
  next()
})


// FUNCTIONS

const roomUsers = new Map()

// ON CONNECTION
io.on('connection', (socket: Socket) => {
    
    console.log(`${socket.data.username} connected`)

    io.emit("welcome","Hello from APP.TS")

    
    //
    // JOIN ROOM
    //
    
    joinRoom(socket,io,roomUsers)
    
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