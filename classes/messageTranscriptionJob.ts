class MessageTranscriptionJob{

    private source: string;
    private rawFilePath: string;
    private completed: boolean = false;

    constructor(source: string, rawFilePath: string){
        this.source = source;
        this.rawFilePath = rawFilePath;
    }

    

    public isCompleted(){
        return this.completed;
    }

}