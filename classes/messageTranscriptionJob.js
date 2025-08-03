"use strict";
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
const formatConverter_1 = __importDefault(require("../lib/formatConverter"));
class MessageTranscriptionJob {
    constructor(source, jobId) {
        this.convertedFilePath = null;
        this.completed = false;
        this.source = source;
        this.jobId = jobId;
    }
    convert() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mp3File = yield formatConverter_1.default.convertToMp3(this.jobId);
                this.convertedFilePath = mp3File;
                console.log(this.convertedFilePath);
            }
            catch (err) {
                console.log("Error: ", err);
            }
        });
    }
    isCompleted() {
        return this.completed;
    }
}
exports.default = MessageTranscriptionJob;
