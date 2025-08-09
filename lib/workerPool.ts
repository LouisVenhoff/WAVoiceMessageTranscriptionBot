import os from "os";
import MessageTranscriptionJob from "../classes/messageTranscriptionJob";

class WorkerPool {

    private workerCount = os.cpus().length - 1;

    private jobQueue: MessageTranscriptionJob[] = [];

    private workers:Worker[] = [];

    constructor(){
        this.createBackgroundWorkers();

        console.log(this.workers.length);
    }

    private createBackgroundWorkers(){
        for(let i = 0; i < this.workerCount; i++){
            this.workers.push(new Worker("./workers/transcriptionWorker.js"));
        }
    }



}

export default WorkerPool;