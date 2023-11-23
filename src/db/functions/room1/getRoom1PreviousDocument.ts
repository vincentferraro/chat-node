import Room1 from "../../Models/room1"

export default async function getRoom1PreviousDocuments(): Promise <any>{

    try{

        const currentDate: Date = new Date()

        const query: Object = {
            date : { $lt: currentDate}
        }
    
        return (await Room1.find(query).sort({date:'desc'}).limit(10)).reverse()

    }catch(err){
        console.error('ERROR getRoom1PreviousDocuments function: ', err)
    }
    
}