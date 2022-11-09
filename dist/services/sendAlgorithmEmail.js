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
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
function getTemplateNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = path.join(__dirname, '../../scraper/data-html');
        const files = yield fs.readdirSync(dir);
        const r = /\d{1,2}/;
        files.sort((f1, f2) => {
            var match1 = r.exec(f1);
            var num1 = match1[0];
            var match2 = r.exec(f2);
            var num2 = match2[0];
            //now you have the two numbers in num1 and num2
            return parseInt(num1, 10) - parseInt(num2, 10);
        });
        const fileNamesDic = {};
        let i = 1;
        for (const file of files) {
            fileNamesDic[i] = file;
            i++;
        }
        return fileNamesDic;
    });
}
function sendAlgorithmEmailService(contacts) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const algorithmEmailTemplateID = "d-a6a27a4ec7ba46a5953648a9095a42de";
            console.log(yield getTemplateNames());
            // Setup the recipient list
            let listOfRecipients = [];
            for (let i = 0; i < contacts.length; i++) {
                const html = yield fs.promises.readFile('./scraper/data-html/1-two-sum.html', "utf8");
                const recipient = {
                    to: [
                        {
                            email: contacts[i].email,
                        }
                    ],
                    dynamic_template_data: {
                        subject: "Your Daily 75 Algorithm",
                        algorithm: html
                    },
                };
                listOfRecipients.push(recipient);
            }
            const messageThrice = {
                personalizations: listOfRecipients,
                from: {
                    email: process.env.EMAIL_FROM_ADDRESS,
                    name: process.env.EMAIL_FROM_NAME,
                },
                reply_to: {
                    email: process.env.EMAIL_FROM_ADDRESS,
                    name: process.env.EMAIL_FROM_NAME,
                },
                templateId: algorithmEmailTemplateID,
                asm: {
                    groupId: 151505,
                    groups_to_display: [
                        151505
                    ],
                }
            };
            // const sentMailRepsonse = await sgMail.sendMultiple(messageThrice);
            // if (sentMailRepsonse[0].statusCode === 202) {
            //   return {
            //     success: true,
            //     status: 202,
            //     message: "All Algorithm Emails Sent Successfully",
            //   };
            // } else {
            //   return {
            //     success: false,
            //     status: sentMailRepsonse[0].statusCode,
            //     message: sentMailRepsonse[0].body.toString(),
            //   };
            // }
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