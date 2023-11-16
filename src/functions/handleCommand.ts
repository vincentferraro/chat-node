import { Socket  } from "socket.io";
import { io } from "../../app";
import getUsersRooms from "./getUsersRoom";


export default async function handleCommand(msg: string,socket: Socket ){

    const actions: Record<string, () => void> ={
        test:():void=>{
            console.log("works")
        },
        rooms:():void=>{
            const roomsAvailabe = ['general','first','second']
            const roomsList = [...socket.rooms].filter(element =>{
                return roomsAvailabe.some((room)=> room.includes(element))
            })
            io.to(socket.id).emit('chat message', roomsList)
        },
        users_room: async (): Promise<void>=>{
            const roomName = str.split(' ')           
            const listUsers = await getUsersRooms(roomName[1])       
            io.to(socket.id).emit('chat message', listUsers)
        },
        username:():void=>{
            const username = msg.toString().trim().split(' ')
            socket.data.username = username[1]
        },
        leave_room:():void=>{
            const room = msg.toString().trim().split(' ')
            if(room[1]==="first" || room[1]=== "second"){
                socket.leave(room[1])
            }
        },
        join_room:():void=>{
            const room = msg.toString().trim().split(' ')
            if(room[1]==="first" || room[1]=== "second"){
                socket.join(room[1])
            }
            io.to(socket.id).emit('chat message', `Welcome to '${room[1]}' channel`)
        },
        disconnect: ():void =>{
            io.to(socket.id).emit('chat message', 'Good Bye!')
            socket.disconnect()
        },
        to:():void=>{
            const room = str.substring(3).split(' ')
            const subString = room.slice(2).join(" ")
            console.log(room)
            if(room[0] ==='general'||room[0] ==='first'||room[0] ==='first'){
                socket.to(room[0]).emit('chat message', room[1])
            }
        }
    }
    const str: string = msg.toString().trim()
    const keys:Array<string> = Object.keys(actions)
    
    for(const key of keys){
        if(str.includes(key)){
            actions[key]()
            break;
        }
    }
}