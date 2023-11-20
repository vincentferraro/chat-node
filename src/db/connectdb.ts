import { connect } from "mongoose";
import General from "./Models/general";
import getPreviousDocument from "./functions/getPreviousDocument";
import createDocument from "./functions/createGeneralDocument";

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
        const response = await getPreviousDocument()
        console.log("Success",response)
        
    }catch(err){
        console.error("ERROR: ", err)
    }
    
}


main()