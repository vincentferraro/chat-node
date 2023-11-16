import { Socket  } from "socket.io";
import { io } from "../../app";
import getUsersRooms from "./getUsersRoom";


export default async function handleCommand(msg: string,socket: Socket ){

    const actions ={
        rooms:()=>{
            const roomsAvailabe = ['general','first','second']
            const roomsList = [...socket.rooms].filter(element =>{
                return roomsAvailabe.some((room)=> room.includes(element))
            })
            io.to(socket.id).emit('chat message', roomsList)
        },
        users_room: async ()=>{
    
        const roomName = str.split(' ')
        
        const listUsers = await getUsersRooms(roomName[1])
        
        io.to(socket.id).emit('chat message', listUsers)
        },
        username:()=>{
            const username = msg.toString().trim().split(' ')
            socket.data.username = username[1]
        },
        leave_room:()=>{
            const room = msg.toString().trim().split(' ')
        if(room[1]==="first" || room[1]=== "second"){
            socket.leave(room[1])
        }
        }
    }
    const str = msg.toString().trim()
    if(str.includes('rooms')){
        const roomsAvailabe = ['general','first','second']
        const roomsList = [...socket.rooms].filter(element =>{
            return roomsAvailabe.some((room)=> room.includes(element))
        })
        io.to(socket.id).emit('chat message', roomsList)

    }else if(str.includes('users_room')){

        const roomName = str.split(' ')
        
        const listUsers = await getUsersRooms(roomName[1])
        
        io.to(socket.id).emit('chat message', listUsers)

    }else if(str.includes('username')){
        const username = msg.toString().trim().split(' ')
        console.log(username[1])
        socket.data.username = username[1]
    }else if(str.includes('leave_room')){
        const room = msg.toString().trim().split(' ')
        if(room[1]==="first" || room[1]=== "second"){
            socket.leave(room[1])
        }
    }else if(str.includes('join_room')){
        const room = msg.toString().trim().split(' ')
        console.log(room[1])
        if(room[1]==="first" || room[1]=== "second"){
            socket.join(room[1])
        }
}
}