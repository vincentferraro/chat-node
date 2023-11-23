import General from "../db/Models/general"
import { removeKeyRedis } from "../redis/redis"
import errorMessage from "../messages/errorMessage"
import { infoMessage } from "../messages/infoMessage"
export async function syncGeneralRoom(redis:any){
        try{
            const messages= await redis.sMembers(`chat:room:general`)
            if(messages.length > 0){
                const documentsList = messages.map((message: string)=> JSON.parse(message))
                const res = await General.insertMany(documentsList)
                if(res){
                    removeKeyRedis(redis,'chat','general')
                    infoMessage('syncGeneralRoom', 'updated')
                    }
            }
            
        }catch(err: any){
            errorMessage('syncGeneralRoom', err)
        }
    }
    
