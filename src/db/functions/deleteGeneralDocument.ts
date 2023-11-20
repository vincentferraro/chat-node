import General from "../Models/general"

export default async function deleteGeneralDocument(id : String): Promise<boolean | void>{

    try{
        const deletedCount = await General.deleteOne({ _id: id})
        if(deletedCount.deletedCount > 0){
            return true
        }

    }catch(err){
        console.error('ERROR deletaGeneralDocument function : ', err)
    }

}