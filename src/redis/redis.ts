

export async function addRedis(redis:any,type:string, room:string, id:string, username: string){
        redis.sAdd(`${type}:room:${room}`,JSON.stringify({id:id,username:username}))
}

export async function removeRedis(redis:any,type:string, room:string, id:string, username: string):Promise<void>{
    redis.sRem(`${type}:room:${room}`,JSON.stringify({id:id,username:username}))
}

export async function handleUserRoomDisconection(redis:any, rooms:Array<string>,id:string, username:string):Promise<void>{
    rooms.forEach(room=>{
        redis.sRem(`user:room:${room}`,JSON.stringify({id:id,username:username}))
    })
}