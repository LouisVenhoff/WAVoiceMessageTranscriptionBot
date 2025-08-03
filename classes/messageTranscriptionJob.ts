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
            let conversionOk:boolean = await FormatConverter.convertToMp3(this.jobId);
            
            if(!conversionOk){
                throw "There was an unexpected error while converting the files!";
            }

            this.convertedFilePath = `/tmp/${this.jobId}.mp3`;
        }catch(err){
            console.log("Error: ", err);
        }
            
    }
    

    public isCompleted(){
        return this.completed;
    }

}

export default MessageTranscriptionJob;