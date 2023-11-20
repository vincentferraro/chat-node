import { connect } from "mongoose";

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
        
    }catch(err){
        console.error("ERROR: ", err)
    }
    
}


main()