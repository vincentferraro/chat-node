import Room1 from "../db/Models/room1"
import errorMessage from "../messages/errorMessage"
import { infoMessage } from "../messages/infoMessage"
import { getRedis, removeKeyRedis } from "../redis/redis"

export default async function syncRoom1Chat(redis: any){
    try{
        const messages = await getRedis(redis,'chat','room1') as Array<string>
        if(messages.length >0){
            const documentsList = messages.map((message) => JSON.parse(message))
            const res = await Room1.insertMany(documentsList)
            if(res){
                removeKeyRedis(redis,'chat','room1')
                infoMessage('syncRoom1Chat', 'updated')
            }

        }
    }catch(err){
        errorMessage('syncRoom1Chat',err)
    }
}