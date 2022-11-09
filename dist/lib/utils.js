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
exports.generateHMAC = exports.generateToken = void 0;
const crypto = require("crypto");
function generateToken(size) {
    return __awaiter(this, void 0, void 0, function* () {
        const randomBuffer = yield crypto.randomBytes(size);
        const bufferString = randomBuffer.toString("hex");
        return bufferString;
    });
}
exports.generateToken = generateToken;
function generateHMAC(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.HMAC_SECRET;
        const hmac = crypto.createHmac('sha256', secret)
            .update(input)
            .digest('hex');
        return hmac;
    });
}
exports.generateHMAC = generateHMAC;
//# sourceMappingURL=utils.js.map