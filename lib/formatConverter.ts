import Ffmpeg from "ffmpeg";

class FormatConverter{

    public static async convertToMp3(filePath: string):Promise<string>{
        
        const videoData = await FormatConverter.generateMediaObject(filePath);

        await videoData.fnExtractSoundToMP3("./test.mp3");
        return new Promise((resolve, reject) => {resolve("hi")});

    }

    private static async generateMediaObject(filePath: string):Promise<any>{
        try{
            return new Promise((resolve, reject) => {
                new Ffmpeg(filePath, async (err, media) => {
                    if(!err){
                        console.log("Video Object is ready!");
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