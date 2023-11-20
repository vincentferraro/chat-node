import General from "../Models/general";
import { IMessageDocument } from "../interfaces/IMessageDocument";

export default async function createGeneralDocument(input:IMessageDocument){
        try{
            const res = await General.create({
                ...input
            })
            return res
            
        }catch(err){
            console.error('Error createDocument function', err)
        }
}