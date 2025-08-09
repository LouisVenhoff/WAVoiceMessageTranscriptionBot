import MessageTranscriptionJob from "../../classes/messageTranscriptionJob"

export type MessageObject = {
    jobId: string,
    waJid: string
}

export type TranscriptionResult = {
    text: string,
    waJid: string
}


self.onmessage = async (e:any) => {
    const transcribed:string = await transcribe(e.data.jobId);

    self.postMessage(transcribed);
}

const transcribe = async(jobId: string) => {
    const job:MessageTranscriptionJob = new MessageTranscriptionJob(jobId);
    const transcribedMessage:string = await job.transcribe();
    return transcribedMessage;
}