
import { IMessageDocument } from "../db/interfaces/IMessageDocument"
import { Username } from "../interfaces/username"

export async function addRedis(redis:any,type:string, room:string, json: IMessageDocument|Username):Promise<void>{
        redis.sAdd(`${type}:room:${room}`,JSON.stringify(json))
}

export async function removeRedis(redis:any,type:string, room:string, json: IMessageDocument|Username):Promise<void>{
    redis.sRem(`${type}:room:${room}`,JSON.stringify(json))
}

export async function handleUserRoomDisconection(redis:any, rooms:Array<string>,json: IMessageDocument|Username):Promise<void>{
    rooms.forEach(room=>{
        removeRedis(redis,'user',room, json)
    })
}