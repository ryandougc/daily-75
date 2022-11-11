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
exports.addContactToSendGridService = void 0;
const client = require("@sendgrid/client");
function addContactToSendGridService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = {
                "contacts": [
                    {
                        email: user.email,
                        custom_fields: {
                            w1_T: user.timezone,
                            w2_N: user.currentAlg
                        }
                    }
                ]
            };
            const request = {
                url: `/v3/marketing/contacts`,
                method: 'PUT',
                body: data
            };
            yield client.request(request);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    });
}
exports.addContactToSendGridService = addContactToSendGridService;
//# sourceMappingURL=contacts_addToSG.js.map