"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatConverter_1 = __importDefault(require("../lib/formatConverter"));
class MessageTranscriptionJob {
    constructor(source, rawFilePath) {
        this.completed = false;
        this.source = source;
        this.rawFilePath = rawFilePath;
    }
    convertToMp3() {
        const mp3File = formatConverter_1.default.convertToMp3(this.rawFilePath);
        console.log(mp3File);
    }
    isCompleted() {
        return this.completed;
    }
}
exports.default = MessageTranscriptionJob;
