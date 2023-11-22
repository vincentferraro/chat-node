import General from "../Models/general";

export default async function getGeneralPreviousDocuments(): Promise <any>{

    try{

        const currentDate: Date = new Date()

        const query: Object = {
            date : { $lt: currentDate}
        }
    
        return (await General.find(query).sort({date:'desc'}).limit(30)).reverse()

    }catch(err){
        console.error('ERROR GetPreviousDocument function: ', err)
    }
    
}