
import { Schema, model } from "mongoose"
import { IMessageDocument } from "../interfaces/IMessageDocument"

const firstShema = new Schema<IMessageDocument>
({
    userId: {type:String, required:true},
    date: {type:String, required:true},
    message: {type:String, required:true}

})


export default class First extends model<IMessageDocument>('first_floor', firstShema){}

