import Room2 from "../../Models/room2"
import { IMessageDocument } from "../../../interfaces/IMessageDocument"

export default async function findRoom2Documents():Promise<any | void>{
    try{

        const response = await Room2.find()
        return response
        
    }catch(err){
        console.error('Function error findRoom2Documents', err)
    }
}