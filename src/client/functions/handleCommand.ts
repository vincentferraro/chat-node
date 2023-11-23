import { Socket } from "socket.io-client";

export default async function handleCommand(msg: string,socket: Socket ){

    // Actions handle message in terminal in conditions the message start by "/"
    const actions: Record<string, () => void> ={
        help:():void=>{
            console.log("Command for use the terminal chat :")
            console.log("<message> - Send message in the chat")
            console.log("/rooms - Display rooms available")
            console.log("/users_room <room_name> - Display users connected to <room_name>")
            console.log("/username <username> - Set up the username")
            console.log("/leave_room <room_name> - Leave the room <room_name>")
            console.log("/join_room <room_name> - Join the room <room_name>")
            console.log("/previous <room_name> - Get previous messages from <room_name>")
        },
        // /rooms
        rooms:():void=>{
            socket.emit('get rooms')
            // @TODO
            // const roomsAvailabe = ['general','room1','room2']
            // const roomsList = [...socket.rooms].filter(element =>{
            //     return roomsAvailabe.some((room)=> room.includes(element))
            // })
            // io.to(socket.id).emit('chat message', roomsList)
        },
        // /users_room <roomName>
        users_room:  (): void =>{
            const room = msg.toString().trim().split(' ')
            socket.emit('get users room', room[1])
        },
        // /username <newName>
        username:():void=>{
            const username = msg.toString().trim().split(' ')
            socket.emit('setUsername',username[1])
        },
        // /leave_room
        leave_room:():void=>{
            const room = msg.toString().trim().split(' ')
            if(room[1]==="room1" || room[1]=== "room2"){
                socket.emit('leave room',room[1])
            }else{ 
                console.log("message info : You can't leave 'general' room")
            }
        },
        // /join_room 
        join_room:():void=>{
            const room = msg.toString().trim().split(' ')
            if(room[1]==="room1" || room[1]=== "room2"){
                socket.emit('join room', room[1])
            }
        },
        // /disconnect
        disconnect: ():void =>{
            console.log('Good Bye!')
            socket.disconnect()
        },
        connect:():void =>{
            socket.connect()
        },
        // /to/<roomName>
        to:():void=>{
          // @TODO
          const room = msg.slice(4,9)
          const line = msg.split(' ')
          console.log(msg, room, line)
          if(room === 'room1' || room === 'room2'){
            socket.emit('chat message', {room:room,message: line[1] })
          }
        },
        // /previous <roomName>
        previous:():void=>{
            const room = msg.toString().trim().split(' ')
            socket.emit('get previous messages', room[1])
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