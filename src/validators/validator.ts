import { body, query } from "express-validator";

export const subscribeValidator = [
  body("email", "You must input an email address")
    .trim()
    .escape()
    .notEmpty()
    .isEmail(),
];

export const subscriptionConfirmedValidator = [
  query(
    "email",
    "Your link is invalid"
  )
    .trim()
    .escape()
    .notEmpty()
    .isEmail(),
  query(
    "securityCode",
    "Your link is invalid"
  )    
    .trim()
    .escape()
    .notEmpty(),
  query(
    "token",
    "Your link is invalid"
  )
    .trim()
    .escape()
    .notEmpty(),
];
