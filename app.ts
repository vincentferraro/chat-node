import express from "express";
import { createServer} from 'http'
import { Server } from "socket.io";
// import { join } from 'path'

// const app : Express= express()
const app  = express()
const httpServer = createServer(app)
const port: number = 3000
const host: string = 'http://localhost'
const io: Server = new Server(httpServer)

// HANDLERS
import messageHandler from "./handlers/message";
// APP


io.socketsJoin("room1")


function addName(){
  let count = 0
  let listName=["Alice", "Henry","Georges"]
  return ()=>{
    let name= listName[count]
    count = count === 2? 0 : count+=1
    return name

  }
}

const setName= addName()

io.use((socket,next)=>{
  socket.join("room1")
  // console.log('A user connected', socket.rooms);
  socket.data.username = setName()
  next()
})


// FUNCTIONS

function handleMessage(user: string, msg: string){
  return `${user} : ${msg.toString().trim()}`
}

// ON CONNECTION
io.on('connection', (socket) => {
    
    console.log(`${socket.data.username} connected`)

    io.emit("welcome","Hello from APP.TS")

    //
    // ON DISCONNECT
    //

    socket.on('disconnect', () => {
      console.log(`${socket.data.username} disconected`);
    });

    //
    // ON CHAT MESSAGE
    //

    socket.on('chat message', (msg) => {
        console.log(`${socket.data.username} :`,msg.toString().trim())
        const string = handleMessage(socket.data.username,msg)
        io.emit("message",string)
    });

  });


httpServer.listen(port,()=>{
    console.log(`Server launched on http://localhost:${port}`)
})