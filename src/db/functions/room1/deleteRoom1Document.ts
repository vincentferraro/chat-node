import Room1 from "../../Models/room1";
import { IMessageDocument } from "../../../interfaces/IMessageDocument";

export default async function deleteRoom1Document(id:string){

    try{
        const deletedCount = await Room1.deleteOne({_id:id})
        if(deletedCount.deletedCount > 0){
            return true
        }
    }catch(err){
        console.error('ERROR deleteRoom1Document function : ', err)
    }
}