"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionConfirmedValidator = exports.subscribeValidator = void 0;
const express_validator_1 = require("express-validator");
exports.subscribeValidator = [
    (0, express_validator_1.body)("email", "You must input an email address")
        .trim()
        .escape()
        .notEmpty()
        .isEmail(),
];
exports.subscriptionConfirmedValidator = [
    (0, express_validator_1.query)("email", "Your link is invalid")
        .trim()
        .escape()
        .notEmpty()
        .isEmail(),
    (0, express_validator_1.query)("securityCode", "Your link is invalid")
        .trim()
        .escape()
        .notEmpty(),
    (0, express_validator_1.query)("token", "Your link is invalid")
        .trim()
        .escape()
        .notEmpty(),
];
//# sourceMappingURL=validator.js.map