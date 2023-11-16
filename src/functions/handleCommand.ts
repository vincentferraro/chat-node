import { Socket  } from "socket.io";
import { io } from "../../app";
import getUsersRooms from "./getUsersRoom";
export default async function handleCommand(msg: string,socket: Socket ){
    const str = msg.toString().trim()
    if(str==='rooms'){
        const sockets = await io.fetchSockets();
        console.log('ok',socket.data)
        for(const socket of sockets){
            console.log(socket.data.username)
        }
    }else if(str.includes('getUsersRoom')){
        const roomName = str.split(' ')
        console.log(roomName)
        const listUsers = await getUsersRooms(roomName[1])
        console.log("END:", listUsers)
        io.to(socket.id).emit('chat message', listUsers)
    }else if(str.includes('username')){
        const username = msg.toString().trim().split(' ')
        console.log(username[1])
        socket.data.username = username[1]
    }else if(str.includes('leaveRoom')){
        const room = msg.toString().trim().split(' ')
        console.log(room[1])
        if(room[1]==="first" || room[1]=== "second"){
            socket.leave(room[1])
        }
    }else if(str.includes('joinRoom')){
        const room = msg.toString().trim().split(' ')
        console.log(room[1])
        if(room[1]==="first" || room[1]=== "second"){
            socket.join(room[1])
        }
}
}