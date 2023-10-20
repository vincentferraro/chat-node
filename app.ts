// import express, { Express } from "express";
import http from 'http'
import { Server } from "socket.io";
// import { join } from 'path'

// const app : Express= express()
const httpServer = http.createServer()
const port: number = 3000
const io: Server = new Server(httpServer)

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('Message received',msg.toString().trim())
    });

  });

httpServer.listen(port,()=>{
    console.log(`Server launched on http://localhost:${port}`)
})