import { exec } from "child_process";

class FormatConverter{

    public static async convertToWav(objectId: string):Promise<boolean>{
        
        return new Promise(async (resolve, reject) => {
            try{
               const inputFile:string = `/tmp/${objectId}.ogg`;
               const outputFile: string = `/tmp/${objectId}.wav`;
    
               exec(`ffmpeg -i ${inputFile} -ar 16000 -ac 1 ${outputFile}`, (err, stdout, stderr) => {
                   console.log(err, stdout, stderr);
                   if(!err || !stderr){
                       resolve(true);
                   }
                   else{
                    resolve(false);
                   }
               });
            }catch(ex: any){
                console.error(ex);
                resolve(false);
            }
        });
    }
};

export default FormatConverter;