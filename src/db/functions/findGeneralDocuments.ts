import General from "../Models/general"

export default async function findGeneralDocuments(){
    try{

        const response = await General.find()
        return response
        
    }catch(err){
        console.error('Function error findDocuments', err)
    }
}