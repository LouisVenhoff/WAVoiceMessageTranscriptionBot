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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class FormatConverter {
    static convertToMp3(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const inputFile = `/tmp/${objectId}.ogg`;
                    const outputFile = `/tmp/${objectId}.wav`;
                    (0, child_process_1.exec)(`ffmpeg -i ${inputFile} -ar 16000 -ac 1 ${outputFile}`, (err, stdout, stderr) => {
                        console.log(err, stdout, stderr);
                    });
                    resolve(true);
                }
                catch (ex) {
                    console.error(ex);
                    resolve(false);
                }
            }));
        });
    }
}
;
exports.default = FormatConverter;
