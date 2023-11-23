

import { model, Schema } from "mongoose";
import { IMessageDocument } from "../../interfaces/IMessageDocument";

const room1Schema = new Schema<IMessageDocument>({
    userId: {type:String, required:true},
    username:{type:String, required:true},
    room: {type:String, required:true},
    date: {type:Date, required:true},
    message: {type:String, required:true}

})

export default class Room1 extends model<IMessageDocument>('room1',room1Schema){}