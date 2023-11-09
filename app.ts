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

// ON CONNECTION
io.on('connection', (socket) => {
    console.log('A user connected', socket.rooms);
    socket.join("room1")
    console.log("ROOM:", socket.rooms)
    socket.data.username = setName()

    console.log("NAME",socket.data.username)
    //
    // ON DISCONNECT
    //

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    //
    // ON CHAT MESSAGE
    //
    socket.on('chat message', (msg) => {
        console.log(`${socket.data.username} :`,msg.toString().trim())
    });

  });

httpServer.listen(port,()=>{
    console.log(`Server launched on http://localhost:${port}`)
})