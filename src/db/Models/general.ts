
import { model, Schema} from "mongoose";

interface IMessageDocument{
    id: string,
    userId: string,
    date: string,
    message: string
}



const generalShema = new Schema<IMessageDocument>
({
    id: {type:String, required:true},
    userId: {type:String, required:true},
    date: {type:String, required:true},
    message: {type:String, required:true}
    
})


export default class General extends model<IMessageDocument>('general', generalShema){}

