import FormatConverter from "../lib/formatConverter";
import fs from "fs";

class MessageTranscriptionJob{

    private source: string;
    private jobId: string;
    private convertedFilePath: string | null = null;
    private completed: boolean = false;

    constructor(source: string, jobId: string){
        this.source = source;
        this.jobId = jobId;
    }

    
    public async transcribe(){
        if(!this.convertedFilePath){
            await this.convert();
            console.log("Converted!");
        }
        
        fs.readFile(this.convertedFilePath, (err:any, data:any) => {
            if(err){
                console.log(err);
                return;
            }

            console.log(data);
        })

        
        const data = new FormData();
        

        // let result = fetch("http://localhost:2002", {
        //     method: "POST",

        // });
    }
    
    
    
    private async convert(){
        try{
            let conversionOk:boolean = await FormatConverter.convertToMp3(this.jobId);
            
            if(!conversionOk){
                throw "There was an unexpected error while converting the files!";
            }

            this.convertedFilePath = `/tmp/${this.jobId}.wav`;
        }catch(err){
            console.log("Error: ", err);
        }
            
    }
    

    public isCompleted(){
        return this.completed;
    }

}

export default MessageTranscriptionJob;