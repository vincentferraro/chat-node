import { io } from "../../app"
import { Username } from "../interfaces/username"

export default async function getUsersRooms(roomName:string): Promise<Array<Username>| undefined>{
    
    if(roomName === 'general' || roomName === 'first' || roomName === 'second' ){
        const sockets = await io.in(roomName).fetchSockets();
        const listUsers: Array<Username> = []
        for(const socket of sockets){
            if(socket.rooms.has(roomName)){
                const data= {
                        id: socket.id,
                        username: socket.data.username
                    }
                listUsers.push(data) 
                }
                
              }
        return listUsers
        }
    
}
