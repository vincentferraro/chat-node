

import { Schema, model } from "mongoose"
import { IMessageDocument } from "../interfaces/IMessageDocument"

const generalShema = new Schema<IMessageDocument>
({
    userId: {type:String, required:true},
    date: {type:String, required:true},
    message: {type:String, required:true}

})


export default class General extends model<IMessageDocument>('general', generalShema){}

