import MessageTranscriptionJob from "../classes/messageTranscriptionJob";

class Transcriber{

    private scheduledJobs:MessageTranscriptionJob[] = [];

    public schedule(job: MessageTranscriptionJob){
        this.scheduledJobs.push(job);
    }

}

export default Transcriber;