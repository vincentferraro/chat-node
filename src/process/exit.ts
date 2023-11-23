import process from "process";

export function exit_process(redis: any){
    process.on('exit',()=>{
        console.log('goodBye')
        redis.flushDb()
    })
}
