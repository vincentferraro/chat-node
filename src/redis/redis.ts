
import { IMessageDocument } from "../db/interfaces/IMessageDocument"
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
        // redis.lpop(`history:room:general`)  @TODO: Find method to delete first cache item of key 'history:room:general'
        addRedis(redis,'history',room,json)
    }catch(err){
        console.error('ERROR removeRedis function:', err)
    }
}

export async function getRedis(redis:any,type:string, room: string):Promise<IMessageDocument|Username|undefined>{
    try{
            return await redis.sMembers(`${type}:room:${room}`)
    }catch(err){
        console.error('ERROR getRedis function:', err)
    }
}