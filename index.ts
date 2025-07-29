import makeWASocket, { DisconnectReason, SignalDataSet, SignalDataTypeMap, useMultiFileAuthState } from "baileys";
import QRCode from "qrcode";
import P from "pino";


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

    socket.ev.on("messages.upsert", ({type, messages}) => {
        if(type == "notify"){
            console.log(messages[0].message);
        }
    });
}

start();

