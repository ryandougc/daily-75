"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subConfSchema = void 0;
const mongoose_1 = require("mongoose");
exports.subConfSchema = new mongoose_1.Schema({
    userId: {
        required: true,
        type: String
    },
    userEmail: {
        required: true,
        type: String
    },
    token: {
        required: true,
        type: String,
    },
    expiryDate: {
        required: false,
        type: Date
    }
});
//# sourceMappingURL=subConf.model.js.map