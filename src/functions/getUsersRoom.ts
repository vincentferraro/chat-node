import { io } from "../../app"
import { username } from "../interfaces/username"

export default async function getUsersRooms(roomName:string): Promise<Array<username>>{
    const sockets = await io.fetchSockets()
    const listUsers: Array<username> = []
    if(roomName === 'general' || roomName === 'first' || roomName === 'second' ){
        for(const socket of sockets){
            console.log(socket.data.username)
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
