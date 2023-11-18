import { io } from "../../src/app"
import { Username } from "../interfaces/username"

export default async function getUsersRooms(roomName:string): Promise<Array<Username>>{
    const sockets = await io.fetchSockets()
    const listUsers: Array<Username> = []
    if(roomName === 'general' || roomName === 'first' || roomName === 'second' ){
        for(const socket of sockets){
            if(socket.rooms.has(roomName)){
                const data= {
                        id: socket.id,
                        username: socket.data.username
                    }
                listUsers.push(data) 
                }
                
              }
        }
    return listUsers
}
