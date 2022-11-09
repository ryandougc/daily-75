"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    email: {
        required: true,
        type: String,
    },
    name: {
        required: false,
        type: String,
    },
    joinedDate: {
        required: true,
        type: Date,
        default: Date.now(),
    },
    tier: {
        required: true,
        type: Number,
        default: 1,
    },
    subscribed: {
        required: true,
        type: Boolean,
        default: false,
    },
    currentAlg: {
        required: true,
        type: Number,
        default: 1,
    },
    timezone: {
        required: true,
        type: String,
        default: "America/Vancouver",
    },
});
//# sourceMappingURL=user.model.js.map