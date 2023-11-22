import getGeneralPreviousDocuments from "../db/functions/getPreviousDocument"
import { addRedis } from "../redis/redis"
export async function syncGeneralHistoryRoom(redis: any){

    try{
        const messages = await getGeneralPreviousDocuments()
        if(messages.length>0){
            for(const message of messages){
                const json = {
                    id: message.userId,
                    username: message.username,
                    room : message.room,
                    date: message.date,
                    message : message. message
                }
                addRedis(redis, 'history','general',json)
            }
        }
    }catch(err){
        console.error('ERROR syncGeneralHistoryRoom function :', err)
    }
}