import io from 'socket.io-client'
import  readline , { ReadLine} from 'readline'
import prompts from 'prompts'

const socket = io('http://localhost:3000')

// const r1: ReadLine = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

async ()=>{
    const response = await prompts({
        type:'text',
        name:'string',
        message: `What's your name ?`
    })
    console.log(response)
}


// Connection
socket.on('connect',()=>{
    console.log('Connected to the webSocket API')
    // socket.emit('set_name',)
})

// Chat Message
socket.on('message',(msg)=>{
    console.log('Message received: '+msg)
})

// socket.emit('chat message',"Hello from client")

process.stdin.on('data',(data)=>{
    console.log('message::',data.toString())
    socket.emit('chat message',data)
})

process.stdout.on('data',(msg)=>{
    socket.emit('chat message',msg)
})
