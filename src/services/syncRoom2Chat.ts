import Room2 from "../db/Models/room2"
import errorMessage from "../messages/errorMessage"
import { infoMessage } from "../messages/infoMessage"
import { getRedis, removeKeyRedis } from "../redis/redis"

export default async function syncRoom2Chat(redis: any){
    try{
        const messages = await getRedis(redis,'chat','room2') as Array<string>
        if(messages.length >0){
            const documentsList = messages.map((message) => JSON.parse(message))
            const res = await Room2.insertMany(documentsList)
            if(res){
                removeKeyRedis(redis,'chat','room2')
                infoMessage('syncRoom2Chat', 'updated')
            }

        }
    }catch(err){
        errorMessage('syncRoom2Chat',err)
    }
}