import io from 'socket.io-client'
import  readline , { ReadLine} from 'readline'
import handleCommand from './functions/handleCommand'

import { setColor, setResetColor } from './functions/setColor'


const socket = io('http://localhost:4000')

const r1: ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const terminalColor= setColor()
const resetColor = setResetColor()
// console.log(terminalColor)
socket.connect()

socket.on('connect', ()=>{
    console.log('Connected to ChatApp')
})

setTimeout(()=>{
    r1.question('What is your username?', (username)=>{
        socket.emit('setUsername', username)
    })
},1000)

r1.on('line', (line) =>{
    if(line.startsWith('/')){
        handleCommand(line, socket)
    }else{
        socket.emit('chat message',{room:"general", message:line})
    }
})

socket.on('chat message', (data)=>{
    const json = JSON.parse(data)
    console.log(terminalColor+`${json.username} : ${json.message}`+resetColor)
})

socket.on('get users room', (data)=>{
    console.log(data)
})

// socket.emit('setUsername', 'vinc')
// socket.emit('get users room', 'general')
