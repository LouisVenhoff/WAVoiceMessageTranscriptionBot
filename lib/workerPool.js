"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
class WorkerPool {
    constructor() {
        this.workerCount = os_1.default.cpus().length - 1;
        this.jobQueue = [];
        this.workers = [];
        this.createBackgroundWorkers();
        console.log(this.workers.length);
    }
    createBackgroundWorkers() {
        for (let i = 0; i < this.workerCount; i++) {
            this.workers.push(new Worker("./workers/transcriptionWorker.js"));
        }
    }
}
exports.default = WorkerPool;
