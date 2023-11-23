
export function infoMessage(functioName: string, msg: string):void{
    console.log('\x1b[33m'+`INFO ${functioName} : ` , msg+'\x1b[0m')
}