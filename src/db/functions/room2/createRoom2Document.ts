import Room2 from "../../Models/room2";
import { IMessageDocument } from "../../../interfaces/IMessageDocument";

export default async function createRoom2Document(input: IMessageDocument):Promise<any|void>{

    await Room2.create({
        ...input
    }).then(res => res)
    .catch(err=> console.error('ERROR createRoom2 Doucment function : ', err))


}