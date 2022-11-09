import * as express from "express";

import * as coreController from "../controllers/core.controller";

import { checkErrors } from "../validators/checkErrors";
import {
  subscribeValidator,
  subscriptionConfirmedValidator,
} from "../validators/validator";

const router = express.Router();

router.get("/", coreController.getLandingPage);

router.post("/subscription", subscribeValidator, checkErrors, coreController.subscribe);

router.get("/subscription/confirmed", subscriptionConfirmedValidator, checkErrors, coreController.getSubscriptionConfirmed);

router.get('/unsubscribe', coreController.unsubscribe)

export { router };
