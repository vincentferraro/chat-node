import { Socket } from "socket.io";


export default function getSocketRoom(socket: Socket):Array<string>|undefined{
    try{
        const roomsList = ["general","room1","room2"]
            const arrayRooms: Array<string> = []
            socket.rooms.forEach(element=>{
                roomsList.forEach(room => {
                    if(room.includes(element)){
                        arrayRooms.push(element)
                    }
                })
            })
            return arrayRooms
    }catch(err){
        console.error('ERROR getSocketRoom function :',err)
    }
}