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
const cron = require("node-cron");
dotenv.config({ path: path.join(__dirname, "../../.env") });
const sendAlgorithmEmail_1 = require("../services/sendAlgorithmEmail");
// cron.schedule(
//     "0 7 * * 1,2,3,4,5", // Run at 7am each week day
//     () => {
//       console.log("Hey");
//     },
//     {
//       scheduled: true,
//       timezone: "America/Vancouver",
//     }
// );
cron.schedule("50 * * * *", // Run at 7am each week day
() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sendAlgorithmEmail_1.sendAlgorithmEmailService)();
}), {
    scheduled: true,
    timezone: "America/Vancouver",
});
//# sourceMappingURL=runScheduleEmail.js.map