import { io } from "socket.io-client";

const socket = io('http://localhost:4000')


function run(){
    socket.connect()

    // SOCKET EMIT



    // socket.on('connect',()=>{
    //     console.log('Connected')
    // })

    setTimeout(()=>{
        socket.emit('setUsername', 'ClientEmit')
    },2000)

    // setTimeout(()=>{
    //     socket.emit('chat message', 'Hello Everyone')
    // },3000)

    // setTimeout(()=>{
    //     socket.emit('setUsername', 'ClientModified')
    // },5000)

    // setTimeout(()=>{
    //     socket.timeout(200000).emit('chat message', 'Hello Everyone2')
    // },8000)
    

    // setTimeout(()=>{
    //     socket.emit('getUsersRoom','general')
    // },10000)

    // setTimeout(()=>{
    //     socket.emit('getUsersRoom','first')
    // },10000)

    // setTimeout(()=>{
    //     socket.emit('chat message', {room:'general', message:' Hello World'})
    // },12000)
    
    setTimeout(()=>{
    
        socket.emit('chat message', {room:'general', message:' Hello2 From Client Emit'})
    
    },4000)
    setTimeout(()=>{
    
        socket.emit('get previous messages')
    },6000)
   
    socket.on('previous messages', (datas)=>{
        
        for(const data of datas){
            console.log(`{ "username":${data.username} , "room": ${data.room}, "message":${data.message}}`)
        }
    })
}


run()