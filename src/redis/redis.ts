import {createClient} from "redis";


export async function redisConnection (){
     const client = await createClient().connect()
     return client
}

// export async function redisDisconnection(client):Promise<void>{
//     try{
//         client.disconnect()
//         console.log('Redis cache disconnected')
//     }catch(err){
//         console.error('Error redisDisconnection function ', err)
//     }
// }

