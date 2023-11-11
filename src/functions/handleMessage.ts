import { Message } from "../interfaces/message"
export default  function handleMessage(user: string, msg: string):Message{
  // return `${user} : ${msg.toString().trim()}`
  return {
    username: user,
    message: msg.toString().trim()
  }
}
