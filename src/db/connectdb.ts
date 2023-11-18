import { connect } from "mongoose";
import General from "./Models/general";



export default async function connection(){
    
    try{
        await connect('mongodb://localhost:27017/colloc-db')
        console.log("Mongoose successfully connected")
    }catch(err){
        console.error("Error connection", err)
    }
}

async function main(){
    try{
        connection()
        const general = new General({
        userId: "user",
        date: "11-18-2023",
        message: "Hello Mong3"
        })
        
        await general.save()
        console.log(general.message)
        const response = await General.find()
        console.log(response)
    }catch(err){
        console.error("ERROR: ", err)
    }
    
}

