import makeWASocket, { DisconnectReason, downloadMediaMessage, getContentType, proto, SignalDataSet, SignalDataTypeMap, useMultiFileAuthState, WAMessage } from "baileys";
import QRCode from "qrcode";
import { createWriteStream } from "fs";


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
                await download(messages[0])
            }
        }
    });
}


const download = async (message: proto.IWebMessageInfo) => {
    
    const msgObject = {
        key: message.key,
        message: message.message,
    }
    
    const stream = await downloadMediaMessage(msgObject, "stream", {});

    const writeStream = createWriteStream("./test.ogg");

    stream.pipe(writeStream);

}

start();

