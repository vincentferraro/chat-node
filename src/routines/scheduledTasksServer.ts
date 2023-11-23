import {schedule} from 'node-cron'
import { syncGeneralRoom } from '../services/syncGeneralRoom'
import syncRoom1Chat from '../services/syncRoom1Chat'
import syncRoom2Chat from '../services/syncRoom2Chat'

export function  scheduledTasksServer(redis:any){
    try{
        schedule('*/10 * * * * *',async()=>{
            syncGeneralRoom(redis)
            syncRoom1Chat(redis)
            syncRoom2Chat(redis)
        })
    }catch(err){
        console.error('ERROR scheduledTasksServer function')
    }
   
}
