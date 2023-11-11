
const messageHandler = (socket:any) => {
    console.log(`${socket.data.username} :`,socket.msg.toString().trim())
}

export default messageHandler
