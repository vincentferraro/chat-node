import Room2 from "../../Models/room2";
import { IMessageDocument } from "../../../interfaces/IMessageDocument";

export default async function deleteRoom2Document(id:string){

    try{
        const deletedCount = await Room2.deleteOne({_id:id})
        if(deletedCount.deletedCount > 0){
            return true
        }
    }catch(err){
        console.error('ERROR deleteRoom2Document function : ', err)
    }
}