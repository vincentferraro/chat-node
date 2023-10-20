import io from 'socket.io-client'
import  readline , { ReadLine} from 'readline'


const socket = io('http://localhost:3000')

const r1: ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let user : string;

r1.question('What is your name?',(answer)=>{
    console.log(`Hello ${answer}`)
    user = answer
    r1.close()
})

// Connection
socket.on('connect',()=>{
    console.log('Connected to the webSocket API')
})

// Chat Message
socket.on('message',(msg)=>{
    console.log('Message received: '+msg)
})

// socket.emit('chat message',"Hello from client")

process.stdin.on('data',(data)=>{
    console.log('message::',data.toString())
    socket.emit('chat message',user+" : "+data)
})

process.stdout.on('data',(msg)=>{
    socket.emit('chat message',msg)
})
