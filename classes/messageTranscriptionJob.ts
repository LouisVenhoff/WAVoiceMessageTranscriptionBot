import FormatConverter from "../lib/formatConverter";

class MessageTranscriptionJob{

    private source: string;
    private rawFilePath: string;
    private completed: boolean = false;

    constructor(source: string, rawFilePath: string){
        this.source = source;
        this.rawFilePath = rawFilePath;
    }

    public convertToMp3(){
        const mp3File:string = FormatConverter.convertToMp3(this.rawFilePath);
        
        console.log(mp3File);
    }
    

    public isCompleted(){
        return this.completed;
    }

}

export default MessageTranscriptionJob;