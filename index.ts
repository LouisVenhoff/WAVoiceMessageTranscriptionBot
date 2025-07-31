import makeWASocket, { DisconnectReason, downloadMediaMessage, getContentType, proto, SignalDataSet, SignalDataTypeMap, useMultiFileAuthState, WAMessage } from "baileys";
import QRCode from "qrcode";
import { createWriteStream } from "fs";
import {v4 as uuidv4} from "uuid";


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
                console.log("There is an Audio Message!");
                const filePath = await download(messages[0])
                console.log(messages[0]);
            }
        }
    });
}


const download = async (message: proto.IWebMessageInfo):Promise<string> => {
    
    const msgObject = {
        key: message.key,
        message: message.message,
    }

    const rawFilePath:string = `./${uuidv4()}.ogg`;
    
    const stream = await downloadMediaMessage(msgObject, "stream", {});

    const writeStream = createWriteStream(rawFilePath);

    stream.pipe(writeStream);

    return rawFilePath;
}

start();

