import General from "../../Models/general";
import { IMessageDocument } from "../../../interfaces/IMessageDocument";

export default async function createGeneralDocument(input:IMessageDocument): Promise<General | void>{

    await General.create({
        ...input
    })
    .then(res =>  res)
    .catch(err => console.error('Error createDocument function', err))
}