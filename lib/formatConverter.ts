import { exec } from "child_process";

class FormatConverter{

    public static async convertToMp3(objectId: string):Promise<boolean>{
        
        return new Promise(async (resolve, reject) => {
            try{
               const inputFile:string = `/tmp/${objectId}.ogg`;
               const outputFile: string = `/tmp/${objectId}.pcm`;
    
               exec(`ffmpeg -i ${inputFile} -f s16le -ar 16000 -ac 1 ${outputFile}`, (err, stdout, stderr) => {
                console.log(err, stdout, stderr);
               });
               resolve(true);
            }catch(ex: any){
                console.error(ex);
                resolve(false);
            }
        });
    }
};

export default FormatConverter;