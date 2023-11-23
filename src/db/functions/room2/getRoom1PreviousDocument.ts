import Room2 from "../../Models/room2"

export default async function getRoom2PreviousDocuments(): Promise <any>{

    try{

        const currentDate: Date = new Date()

        const query: Object = {
            date : { $lt: currentDate}
        }
    
        return (await Room2.find(query).sort({date:'desc'}).limit(10)).reverse()

    }catch(err){
        console.error('ERROR getRoom2PreviousDocuments function: ', err)
    }
    
}