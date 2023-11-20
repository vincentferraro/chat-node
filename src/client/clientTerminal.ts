import io from 'socket.io-client'
import  readline , { ReadLine} from 'readline'
import handleCommand from '../functions/handleCommand'
import { Socket } from 'socket.io'
// import prompts from 'prompts'

const socket = io('http://localhost:4000')

const r1: ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


socket.connect()
socket.on('connect', ()=>{
    console.log('Connected to ChatApp')
})
setTimeout(()=>{
    r1.question('What is your username?', (username)=>{
        socket.emit('setUsername', username)
    })
},2000)

function displayHelp(){
    console.log()
}

r1.on('line', (line) =>{
    if(line.startsWith('/')){
        // handleCommand(line, socket as Socket)
    }else{
        socket.emit('chat message',{room:"general", message:line})
    }
})

socket.on('chat message', (data)=>{
    const json = JSON.parse(data)
    console.log(`${json.username} : ${json.message}`)
})


