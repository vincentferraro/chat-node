import express, { Express} from "express";
import { createServer, Server as serv} from 'http'
import serverSocket from "./src/sockets/connection";
import { Server, Socket } from "socket.io";

// MONGODB
import connection from "./src/db/connectdb";

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


function run(){
  connection()
  serverSocket(io)

}
run()
// ON CONNECTION

httpServer.listen(port,host,()=>{
    console.log(`Server launched on http://${host}:${port}`)
})

export { io }