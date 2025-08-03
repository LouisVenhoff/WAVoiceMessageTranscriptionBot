import FormatConverter from "../lib/formatConverter";

class MessageTranscriptionJob{

    private source: string;
    private jobId: string;
    private convertedFilePath: string | null = null;
    private completed: boolean = false;

    constructor(source: string, jobId: string){
        this.source = source;
        this.jobId = jobId;
    }

    public async convert(){
        try{
            const mp3File:string = await FormatConverter.convertToMp3(this.jobId);
            this.convertedFilePath = mp3File;
            console.log(this.convertedFilePath);
        }catch(err){
            console.log("Error: ", err);
        }
            
    }
    

    public isCompleted(){
        return this.completed;
    }

}

export default MessageTranscriptionJob;