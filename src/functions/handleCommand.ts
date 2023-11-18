import { Socket  } from "socket.io";
import { io } from "../../app";
import getUsersRooms from "./getUsersRoom";
import handleMessage from "./handleMessage";
import { Data } from "../interfaces/message";

export default async function handleCommand(msg: Data,socket: Socket ){

    // Actions handle message in terminal in conditions the message start by "/"
    const actions: Record<string, () => void> ={
        test:():void=>{
            console.log("works")
        },
        // /rooms
        rooms:():void=>{
            const roomsAvailabe = ['general','first','second']
            const roomsList = [...socket.rooms].filter(element =>{
                return roomsAvailabe.some((room)=> room.includes(element))
            })
            io.to(socket.id).emit('chat message', roomsList)
        },
        // /users_room <roomName>
        users_room: async (): Promise<void>=>{
            const roomName = str.split(' ')           
            const listUsers = await getUsersRooms(roomName[1])       
            io.to(socket.id).emit('chat message', listUsers)
        },
        // /username <newName>
        username:():void=>{
            const username = msg.toString().trim().split(' ')
            socket.data.username = username[1]
        },
        // /leave_room
        leave_room:():void=>{
            const room = msg.toString().trim().split(' ')
            if(room[1]==="first" || room[1]=== "second"){
                socket.leave(room[1])
            }
        },
        // /join_room 
        join_room:():void=>{
            const room = msg.toString().trim().split(' ')
            if(room[1]==="first" || room[1]=== "second"){
                socket.join(room[1])
            }
            io.to(socket.id).emit('chat message', `Welcome to '${room[1]}' channel`)
        },
        // /disconnect
        disconnect: ():void =>{
            io.to(socket.id).emit('chat message', 'Good Bye!')
            socket.disconnect()
        },
        // /to/<roomName>
        to:():void=>{
            // const room = str.substring(4).split(' ')
            // const subString = room.slice(1).join(" ")
            //     if(io.sockets.adapter.rooms.has(room[0])){
            //         const json = JSON.stringify(handleMessage(socket.data.username,subString))
            //         io.to(room[0]).emit('chat message', json)
            //     }
            
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