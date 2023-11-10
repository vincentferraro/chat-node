import express from "express";
import { createServer} from 'http'
import { Server } from "socket.io";
// import { join } from 'path'

// const app : Express= express()
const app  = express()
const httpServer = createServer(app)
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
  socket.join("General")
  // console.log('A user connected', socket.rooms);
  socket.data.username = setName()
  next()
})


// FUNCTIONS

function handleMessage(user: string, msg: string){
  // return `${user} : ${msg.toString().trim()}`
  return {
    username: user,
    message: msg.toString().trim()
  }
}

const roomUsers = new Map()

// ON CONNECTION
io.on('connection', (socket) => {
    
    console.log(`${socket.data.username} connected`)

    io.emit("welcome","Hello from APP.TS")

    
    //
    // JOIN ROOM
    //

    socket.on('joinRoom',(roomName,username)=>{
      
      if(!roomUsers.has(roomName)){
        roomUsers.set(roomName,[])
      }
      socket.join(roomName)
      roomUsers.get(roomName).push({id:socket.id,name:username})

      io.to(roomName).emit('roomUsers',roomUsers.get(roomName))
    })

    
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
      console.log(msg.toString().trim())
        const string = handleMessage(socket.data.username,msg)
        io.emit("message",string)
    });

  });


httpServer.listen(port,()=>{
    console.log(`Server launched on http://localhost:${port}`)
})