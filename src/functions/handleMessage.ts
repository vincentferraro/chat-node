import { Data } from "../interfaces/message"
export default  function handleMessage(user: string, data: Data):Data{
  return {
    username: user,
    room: data.room,
    message: data.message
  }
}
