import {schedule} from 'node-cron'
import { syncGeneralRoom } from '../services/syncGeneralRoom'

export function  scheduledTasksServer(redis:any){
    try{
        schedule('*/10 * * * * *',async()=>{
            syncGeneralRoom(redis)
        })
    }catch(err){
        console.error('ERROR scheduledTasksServer function')
    }
   
}
