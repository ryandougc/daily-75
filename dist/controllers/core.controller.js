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
exports.unsubscribe = exports.getSubscriptionConfirmed = exports.subscribe = exports.getLandingPage = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../lib/utils");
const user_model_1 = require("../models/user.model");
const subConf_model_1 = require("../models/subConf.model");
const sendSubscriptionConfirmationEmail_1 = require("../services/sendSubscriptionConfirmationEmail");
const addContactToSendGrid_1 = require("../services/addContactToSendGrid");
const User = mongoose_1.default.model('User', user_model_1.userSchema);
const SubConf = mongoose_1.default.model('SubConf', subConf_model_1.subConfSchema);
const getLandingPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("index.ejs");
});
exports.getLandingPage = getLandingPage;
const subscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body.email;
        // Check if user is already subscribed, otherwise make a new user
        let user = yield User.findOne({ email: userEmail });
        if (user) {
            if (user.subscribed) {
                return next({
                    success: false,
                    status: 409,
                    message: "You are already subscribed",
                });
            }
        }
        else {
            user = yield new User({
                email: userEmail
            }).save();
        }
        // Generate Confirmation link
        const token = yield (0, utils_1.generateToken)(64);
        const userIdHash = yield (0, utils_1.generateHMAC)(user._id.toString());
        const subscriptionConfirmationLink = `${process.env.BASE_URL}/subscription/confirmed?email=${user.email}&securityCode=${userIdHash}&token=${token}`;
        // Save subscription data in database
        const newSubConf = yield new SubConf({
            userEmail: user.email,
            userId: user._id.toString(),
            token: token
        }).save();
        // Send confirmation email
        yield (0, sendSubscriptionConfirmationEmail_1.sendSubscriptionConfirmationEmailService)(user, subscriptionConfirmationLink);
        res.status(200).render("subscriptionPendingPage.ejs");
    }
    catch (err) {
        console.log(err);
        return next({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
});
exports.subscribe = subscribe;
const getSubscriptionConfirmed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.email;
        const userIdHash = req.query.securityCode;
        const token = req.query.token;
        console.log(userEmail);
        console.log(userIdHash);
        console.log(token);
        // Search email in confirmation database
        const userSubConf = yield SubConf.findOne({ userEmail: userEmail });
        console.log(userSubConf);
        // hash userid and match to userIdHash
        // Also check if the tokens match
        const comparisonUserIdHash = yield (0, utils_1.generateHMAC)(userSubConf.userId);
        if (comparisonUserIdHash !== userIdHash || token !== userSubConf.token) {
            console.log("link issue");
            return next({
                success: false,
                status: 401,
                message: "Your link is invalid",
            });
        }
        // Update user's subscription status to true
        yield User.updateOne({ _id: userSubConf.userId }, { subscribed: true });
        yield userSubConf.deleteOne({ _id: userSubConf._id });
        // Add user to sendgrid contact list
        const user = yield User.findOne({ _id: userSubConf.userId });
        yield (0, addContactToSendGrid_1.addContactToSendGridService)(user);
        res.status(200).render("subscriptionConfirmedPage.ejs");
    }
    catch (err) {
        console.log(err);
        return next({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
});
exports.getSubscriptionConfirmed = getSubscriptionConfirmed;
const unsubscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.email;
        const userIdHash = req.query.securityCode;
        const token = req.query.token; // Research how unsubscribe tokens work
        yield User.updateOne({ email: userEmail }, { subsribed: false });
        // Render unsubscribe successful page
        res.render("unsubscribe.ejs");
    }
    catch (err) {
        console.log(err);
        return next({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
});
exports.unsubscribe = unsubscribe;
//# sourceMappingURL=core.controller.js.map