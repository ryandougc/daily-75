"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const coreController = require("../controllers/core.controller");
const checkErrors_1 = require("../validators/checkErrors");
const validator_1 = require("../validators/validator");
const router = express.Router();
exports.router = router;
router.get("/", coreController.getLandingPage);
router.post("/subscription", validator_1.subscribeValidator, checkErrors_1.checkErrors, coreController.subscribe);
router.get("/subscription/confirmed", validator_1.subscriptionConfirmedValidator, checkErrors_1.checkErrors, coreController.getSubscriptionConfirmed);
router.get('/unsubscribe', coreController.unsubscribe);
//# sourceMappingURL=core.route.js.map