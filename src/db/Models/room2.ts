

import { model, Schema } from "mongoose";
import { IMessageDocument } from "../../interfaces/IMessageDocument";

const room2Schema = new Schema<IMessageDocument>({
    userId: {type:String, required:true},
    username:{type:String, required:true},
    room: {type:String, required:true},
    date: {type:Date, required:true},
    message: {type:String, required:true}

})

export default class Room2 extends model<IMessageDocument>('room2',room2Schema){}