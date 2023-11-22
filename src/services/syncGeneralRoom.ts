import General from "../db/Models/general"

export async function syncGeneralRoom(redis:any){
        try{
            const messages= await redis.sMembers(`chat:room:general`)
            if(messages.length > 0){
                const documentsList = messages.map((message: string)=> JSON.parse(message))
                const res = await General.insertMany(documentsList)
                if(res){
                        redis.del(`chat:room:general`)
                    }
            }
            
        }catch(err){
            console.error('Error syncGeneralRoom', err)
        }
    }
    
