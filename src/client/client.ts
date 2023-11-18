import io from 'socket.io-client'
import  readline , { ReadLine} from 'readline'
import prompts from 'prompts'

const socket = io('http://localhost:4000')

// const r1: ReadLine = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

 async function setUsername (){
    const username =  await prompts({
        type:'text',
        name:'string',
        message: `What's your name ?`
    })
    return username.string
}

const run = async ()=>{
    try{
        const username = await setUsername()

        socket.on('connect',()=>{
            console.log('Connected to the webSocket API')
  
        })
        socket.emit('setUsername', username)
        // Chat Message
        socket.on('chat message',(data)=>{
            console.log( data);
        })
    
        socket.on("welcome",(data)=>{
            console.log(data.toString())
        })
    
        process.stdin.on('data',(data)=>{
            
            socket.emit('chat message',data)
        })
    
        process.stdout.on('data',(msg)=>{
            socket.emit('chat message',msg)
            function clearPreviousLine() {
                readline.moveCursor(process.stdout, 0, -1); // Move cursor up one line
                readline.clearLine(process.stdout, 0);     // Clear the line
              }
              clearPreviousLine()
        })
        }catch(err){
        console.log('Error',err)
        }
    
}

run()

