import {schedule} from 'node-cron'
import { syncGeneralRoom } from '../services/syncGeneralRoom'

export function  scheduledTasksServer(redis:any){
    schedule('*/10 * * * * *',async()=>{
        syncGeneralRoom(redis)
    })
}
