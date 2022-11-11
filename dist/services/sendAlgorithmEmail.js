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
exports.sendAlgorithmEmailService = void 0;
const sgMail = require("@sendgrid/mail");
const getAlgorithmTemplate_1 = require("./getAlgorithmTemplate");
const contacts_updateCurrentAlg_1 = require("./contacts_updateCurrentAlg");
function sendAlgorithmEmailService(contacts) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Setup the recipient list
            let recipients = [];
            for (let i = 0; i < contacts.length; i++) {
                const currentAlgTemplate = yield (0, getAlgorithmTemplate_1.getAlgorithmTemplateService)(contacts[i].currentAlg);
                const recipient = {
                    to: [
                        {
                            email: contacts[i].email,
                        }
                    ],
                    dynamic_template_data: {
                        subject: "Your Daily 75 Algorithm",
                        algorithm: currentAlgTemplate
                    },
                };
                recipients.push(recipient);
            }
            // Setup the algorithm emails
            const emailData = {
                personalizations: recipients,
                from: {
                    email: process.env.SG_EMAIL_FROM_ADDRESS,
                    name: process.env.SG_EMAIL_FROM_NAME,
                },
                reply_to: {
                    email: process.env.SG_EMAIL_FROM_ADDRESS,
                    name: process.env.SG_EMAIL_FROM_NAME,
                },
                templateId: process.env.SG_ALGORITHM_EMAIL_TEMPLATE_ID,
                asm: {
                    groupId: 151505,
                    groups_to_display: [
                        151505
                    ],
                }
            };
            // Send the algorithm Emails
            const sentMailRepsonse = yield sgMail.sendMultiple(emailData);
            if (sentMailRepsonse[0].statusCode === 202) {
                // Update user's current algorithm in mongoDB and sendgrid
                for (let i = 0; i < contacts.length; i++) {
                    yield (0, contacts_updateCurrentAlg_1.updateContactCurrentAlgService)(contacts[i].email);
                }
                return {
                    success: true,
                    status: 202,
                    message: "All Algorithm Emails Sent Successfully",
                };
            }
            else {
                return {
                    success: false,
                    status: sentMailRepsonse[0].statusCode,
                    message: sentMailRepsonse[0].body.toString(),
                };
            }
        }
        catch (err) {
            console.log(err.response.body);
            return {
                success: false,
                status: 500,
                message: "Internal Server Error",
            };
        }
    });
}
exports.sendAlgorithmEmailService = sendAlgorithmEmailService;
//# sourceMappingURL=sendAlgorithmEmail.js.map