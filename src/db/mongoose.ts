import { Mongoose } from "mongoose";

const mongoose = new Mongoose()

async function main(){
    
    try{
        const response =  await mongoose.connect('mongodb://localhost:27017/colloc-db')
        console.log("Connected", response)
    }catch(err){
        console.error("Error connection", err)
    }
}

main()