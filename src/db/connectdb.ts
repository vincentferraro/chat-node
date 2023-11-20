import { connect } from "mongoose";
import General from "./Models/general";
import getPreviousDocument from "./functions/getPreviousDocument";
import createDocument from "./functions/createGeneralDocument";
import deleteGeneralDocument from "./functions/deleteGeneralDocument";

export default async function connection(): Promise <void>{
    
    try{
        await connect('mongodb://localhost:27017/colloc-db')
        console.log("Mongoose successfully connected")
    }catch(err){
        console.error("Error connection", err)
    }
}

async function main(): Promise<void>{
    try{
        connection()
        const response = await deleteGeneralDocument('655b793f2ff6033f92c86')
        
    }catch(err){
        console.error("ERROR: ", err)
    }
    
}


main()