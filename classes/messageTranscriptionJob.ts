import FormatConverter from "../lib/formatConverter";

class MessageTranscriptionJob{

    private source: string;
    private rawFilePath: string;
    private completed: boolean = false;

    constructor(source: string, rawFilePath: string){
        this.source = source;
        this.rawFilePath = rawFilePath;
    }

    public async convertToMp3(){
        try{
            const mp3File:string = await FormatConverter.convertToMp3(this.rawFilePath);
            console.log(mp3File);
        }catch(err){
            console.log("Error: ", err);
        }
            
    }
    

    public isCompleted(){
        return this.completed;
    }

}

export default MessageTranscriptionJob;