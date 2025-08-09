import makeWASocket, { DisconnectReason, downloadMediaMessage, getContentType, proto, SignalDataSet, SignalDataTypeMap, useMultiFileAuthState, WAMessage } from "baileys";
import QRCode from "qrcode";
import { createWriteStream } from "fs";
import {v4 as uuidv4} from "uuid";
import MessageTranscriptionJob from "./classes/messageTranscriptionJob";
import {promisify} from "util";
import {pipeline} from "stream";
import { DownloadResult } from "./types/downloadResult";

const pipelineAsync = promisify(pipeline);

const start = async () => {
    const {state, saveCreds} = await useMultiFileAuthState("auth_info_baileys");

    const socket = makeWASocket({
        auth: state,
    });

    socket.ev.on("creds.update", saveCreds);

    socket.ev.on("connection.update", async (update) => {
        const {connection, lastDisconnect, qr} = update;
        if(qr){
            console.log(await QRCode.toString(qr, {type: "string"}))
        }

        if(connection == "close"){
            console.log(lastDisconnect);
            start();
        }
    })

    socket.ev.on("messages.upsert", async ({type, messages}) => {
        if(type == "notify"){
            //Transcribe message here
            let contentType = getContentType(messages[0].message);

            if(contentType == "audioMessage"){
                const result: DownloadResult = await download(messages[0])
                console.log(result.rawFilePath);
                console.log(result.id);
                // const job:MessageTranscriptionJob = new MessageTranscriptionJob(result.id);
                // const output:string = await job.transcribe();
                const output:string ="Test"
                console.log(output);
                await socket.sendMessage(messages[0].key.remoteJid, {text: output});
            }
        }
    });
}


const download = async (message: proto.IWebMessageInfo):Promise<DownloadResult> => {
    
    const msgObject = {
        key: message.key,
        message: message.message,
    }

    const fileId: string = uuidv4();
    
    const rawFilePath:string = `/tmp/${fileId}.ogg`;
    
    const stream = await downloadMediaMessage(msgObject, "stream", {});

    const writeStream = createWriteStream(rawFilePath);

    await pipelineAsync(stream, writeStream);

    return {id: fileId, rawFilePath: rawFilePath};
}

const startTranscriptionWorker = async (message: any) => {
    // Start a new worker here!
}

start();

