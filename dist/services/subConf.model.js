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
exports.sendSubscriptionConfirmationEmailService = void 0;
const sgMail = require("@sendgrid/mail");
function sendSubscriptionConfirmationEmailService(user, subscriptionConfirmationLink) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const confirmSubscriptionTemplateID = "d-0a18e0af3dc642658c7c2c1fbf2a1704";
            const emailContent = {
                from: {
                    email: process.env.EMAIL_FROM_ADDRESS,
                    name: process.env.EMAIL_FROM_NAME,
                },
                reply_to: {
                    email: process.env.EMAIL_FROM_ADDRESS,
                    name: process.env.EMAIL_FROM_NAME,
                },
                to: {
                    email: user.email,
                    name: user.name,
                },
                templateId: confirmSubscriptionTemplateID,
                dynamicTemplateData: {
                    subject: "Confirm your Daily 75 Subscription",
                    name: user.name,
                    subscriptionConfirmationLink: subscriptionConfirmationLink,
                },
            };
            const sentMailRepsonse = yield sgMail.send(emailContent);
            if (sentMailRepsonse[0].statusCode === 202) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    });
}
exports.sendSubscriptionConfirmationEmailService = sendSubscriptionConfirmationEmailService;
//# sourceMappingURL=subConf.model.js.map