import General from "../Models/general";
import { IMessageDocument } from "../interfaces/IMessageDocument";

export default async function createGeneralDocument(input:IMessageDocument): Promise<General | void>{
        try{
            const res: General = await General.create({
                ...input
            })
            return res
            
        }catch(err){
            console.error('Error createDocument function', err)
        }
}