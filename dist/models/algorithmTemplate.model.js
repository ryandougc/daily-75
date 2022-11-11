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
exports.AlgorithmTemplate = void 0;
const path = require("path");
const fs = require("fs");
class AlgorithmTemplate {
    constructor() {
        this.templateFileNames = this.getTemplateFileNames();
        this.templateFileDictionary = this.createTemplateFileDictionary();
    }
    getTemplateFileNames() {
        const dir = path.join(__dirname, '../../scraper/algorithm-html-files');
        const files = fs.readdirSync(dir);
        // Sort files in numbered order
        const r = /\d{1,2}/;
        files.sort((f1, f2) => {
            var match1 = r.exec(f1);
            var num1 = match1[0];
            var match2 = r.exec(f2);
            var num2 = match2[0];
            return parseInt(num1, 10) - parseInt(num2, 10);
        });
        return files;
    }
    createTemplateFileDictionary() {
        const fileNamesDicionary = {};
        let i = 1;
        for (const file of this.templateFileNames) {
            fileNamesDicionary[i] = file;
            i++;
        }
        return fileNamesDicionary;
    }
    getAlgorithmTemplateName(algId) {
        const foundAlg = this.templateFileDictionary[algId];
        if (foundAlg)
            return foundAlg;
        else
            return undefined;
    }
    getAlgorithmTemplate(algId) {
        return __awaiter(this, void 0, void 0, function* () {
            const algIdStr = algId.toString();
            const algName = this.getAlgorithmTemplateName(algIdStr);
            const html = yield fs.promises.readFile(`./scraper/algorithm-html-files/${algName}`, "utf8");
            if (html)
                return html;
            else
                return undefined;
        });
    }
}
exports.AlgorithmTemplate = AlgorithmTemplate;
//# sourceMappingURL=algorithmTemplate.model.js.map