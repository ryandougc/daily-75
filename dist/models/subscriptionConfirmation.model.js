"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionConfirmationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.subscriptionConfirmationSchema = new mongoose_1.Schema({
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
//# sourceMappingURL=subscriptionConfirmation.model.js.map