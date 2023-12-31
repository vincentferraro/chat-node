import express, { Express} from "express";
import { createServer, Server as serv} from 'http'
import serverSocket from "./src/sockets/connection";
import { Server } from "socket.io";

// PROCESS MANAGEMENT
import { exit_process } from "./src/process/exit";
// MONGODB
import connection from "./src/db/connectdb";

// REDIS
import { createClient} from "redis";
import { getRedis } from "./src/redis/redis";
// ROUTINES
import { scheduledTasksServer} from "./src/routines/scheduledTasksServer"

import {syncGeneralHistoryRoom} from "./src/services/syncGeneralHistoryRoom"
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


async function run(){
  const redis = await createClient().connect()
  redis.FLUSHDB() // Reinitizalize the DB
  await connection()
  scheduledTasksServer(redis)
   await syncGeneralHistoryRoom(redis)
  
  
  await serverSocket(io, redis)

}
run()


// ON CONNECTION

httpServer.listen(port,host,()=>{
    console.log(`Server launched on http://${host}:${port}`)
})

export { io }