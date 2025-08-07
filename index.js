"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("baileys"));
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const messageTranscriptionJob_1 = __importDefault(require("./classes/messageTranscriptionJob"));
const util_1 = require("util");
const stream_1 = require("stream");
const pipelineAsync = (0, util_1.promisify)(stream_1.pipeline);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)("auth_info_baileys");
    const socket = (0, baileys_1.default)({
        auth: state,
    });
    socket.ev.on("creds.update", saveCreds);
    socket.ev.on("connection.update", (update) => __awaiter(void 0, void 0, void 0, function* () {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.log(yield qrcode_1.default.toString(qr, { type: "string" }));
        }
        if (connection == "close") {
            console.log(lastDisconnect);
            start();
        }
    }));
    socket.ev.on("messages.upsert", (_a) => __awaiter(void 0, [_a], void 0, function* ({ type, messages }) {
        if (type == "notify") {
            //Transcribe message here
            let contentType = (0, baileys_1.getContentType)(messages[0].message);
            if (contentType == "audioMessage") {
                const result = yield download(messages[0]);
                console.log(result.rawFilePath);
                console.log(result.id);
                const job = new messageTranscriptionJob_1.default("01713432484", result.id);
                yield job.transcribe();
            }
        }
    }));
});
const download = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const msgObject = {
        key: message.key,
        message: message.message,
    };
    const fileId = (0, uuid_1.v4)();
    const rawFilePath = `/tmp/${fileId}.ogg`;
    const stream = yield (0, baileys_1.downloadMediaMessage)(msgObject, "stream", {});
    const writeStream = (0, fs_1.createWriteStream)(rawFilePath);
    yield pipelineAsync(stream, writeStream);
    return { id: fileId, rawFilePath: rawFilePath };
});
start();
