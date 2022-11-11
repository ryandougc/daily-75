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
const path = require("path");
const dotenv = require("dotenv");
const mongoose_1 = require("mongoose");
const sgMail = require("@sendgrid/mail");
const client = require("@sendgrid/client");
const sendAlgorithmEmail_1 = require("../services/sendAlgorithmEmail");
const contacts_getAll_1 = require("../services/contacts_getAll");
dotenv.config({ path: path.join(__dirname, "../../.env") });
// cron.schedule(
//     "0 7 * * 1,2,3,4,5", // Run at 7am each week day
//     async () => {
//         await sendAlgorithmEmailService()
//     },
//     {
//       scheduled: true,
//       timezone: "America/Vancouver",
//     }
// );
run().catch(err => console.log);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URL);
        sgMail.setApiKey(process.env.SG_API_KEY);
        client.setApiKey(process.env.SG_API_KEY);
        const contacts = yield (0, contacts_getAll_1.getContactsService)();
        yield (0, sendAlgorithmEmail_1.sendAlgorithmEmailService)(contacts);
    });
}
//# sourceMappingURL=sendEmailAlgOnSchedule.js.map