
import { IMessageDocument } from "../interfaces/IMessageDocument"
import { Username } from "../interfaces/username"

export async function addRedis(redis:any,type:string, room:string, json: IMessageDocument|Username):Promise<void>{
    try{
        redis.sAdd(`${type}:room:${room}`,JSON.stringify(json))
    }catch(err){
        console.error('ERROR addRedis function:', err)
    }
}

export async function removeRedis(redis:any,type:string, room:string, json: IMessageDocument|Username):Promise<void>{
    try{
        redis.sRem(`${type}:room:${room}`,JSON.stringify(json))
    }catch(err){
        console.error('ERROR removeRedis function:', err)
    }
}

export async function handleUserRoomDisconection(redis:any, rooms:Array<string>,json: IMessageDocument|Username):Promise<void>{
    try{
        rooms.forEach(room=>{
            removeRedis(redis,'user',room, json)
        })
    }catch(err){
        console.error('ERROR removeRedis function:', err)
    }
}

export async function handleHistoryCache(redis: any,room: string, json:IMessageDocument|Username): Promise<void>{
    try{
        redis.sPop(`history:room:${room}`)
        addRedis(redis,'history',room,json)
    }catch(err){
        console.error('ERROR removeRedis function:', err)
    }
}

export async function getRedis(redis:any,type:string, room: string):Promise<Array<IMessageDocument|Username|string>|undefined>{
    try{
            return await redis.sMembers(`${type}:room:${room}`)
    }catch(err){
        console.error('ERROR getRedis function:', err)
    }
}

export async function updateRedis(redis:any,type:string, rooms:Array<string>, json: IMessageDocument|Username, newjson:IMessageDocument|Username):Promise<void>{
    try{
        rooms.forEach(room=>{
            removeRedis(redis,type,room,json)
            addRedis(redis,type, room, newjson)
        })
    }catch(err){
        console.error('ERROR updateRedis function :', err)
    }
}

export async function removeKeyRedis(redis:any, type:string, room:string){
    try{
        redis.del(`${type}:room:${room}`)
    }catch(err){
        console.error('ERROR removeKeyRedis function :', err)
    }
}

