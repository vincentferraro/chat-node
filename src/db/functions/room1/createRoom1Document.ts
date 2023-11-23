import Room1 from "../../Models/room1";
import { IMessageDocument } from "../../../interfaces/IMessageDocument";

export default async function createRoom1Document(input: IMessageDocument):Promise<any|void>{

    await Room1.create({
        ...input
    }).then(res => res)
    .catch(err=> console.error('ERROR createRoom1 Doucment function : ', err))


}