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
    constructor(source, rawFilePath) {
        this.completed = false;
        this.source = source;
        this.rawFilePath = rawFilePath;
    }
    convertToMp3() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mp3File = yield formatConverter_1.default.convertToMp3(this.rawFilePath);
                console.log(mp3File);
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
