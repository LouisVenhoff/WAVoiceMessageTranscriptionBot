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
const messageTranscriptionJob_1 = __importDefault(require("../../classes/messageTranscriptionJob"));
self.onmessage = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const transcribed = yield transcribe(e.data.jobId);
    self.postMessage(transcribed);
});
const transcribe = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = new messageTranscriptionJob_1.default(jobId);
    const transcribedMessage = yield job.transcribe();
    return transcribedMessage;
});
