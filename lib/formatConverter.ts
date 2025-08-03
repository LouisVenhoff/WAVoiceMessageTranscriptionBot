import Ffmpeg from "ffmpeg";

class FormatConverter{

    public static async convertToMp3(objectId: string):Promise<boolean>{
        
        return new Promise(async (resolve, reject) => {
            try{
                const mediaData = await FormatConverter.generateMediaObject(`/tmp/${objectId}.ogg`);
    
                await mediaData.fnExtractSoundToMP3(`/tmp/${objectId}.mp3`);
                resolve(true);
            }catch(ex: any){
                console.error(ex);
                resolve(false);
            }
        });
    }

    private static async generateMediaObject(filePath: string):Promise<any>{
        try{
            return new Promise((resolve, reject) => {
                new Ffmpeg(filePath, async (err, media) => {
                    if(!err){
                        resolve(media);
                    }else{
                        throw err;
                    }
                });
            });
        }
        catch(err: any){
            console.log("Error: ", err);
        }
    }

};

export default FormatConverter;