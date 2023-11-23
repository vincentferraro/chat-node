import Room1 from "../../Models/room1"
import { IMessageDocument } from "../../../interfaces/IMessageDocument"

export default async function findRoom1Documents():Promise<any | void>{
    try{

        const response = await Room1.find()
        return response
        
    }catch(err){
        console.error('Function error findRoom1Documents', err)
    }
}