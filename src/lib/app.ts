import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as sgMail from "@sendgrid/mail";
import * as client from "@sendgrid/client";
import mongoose from "mongoose";

import DB from "../lib/db";

import { router as coreRoutes } from "../routes/core.route";
import { errorHandler, error404Handler } from "../routes/errorRoutes";

export default class App {
  public express;

  constructor() {
    this.express = express();
    this.initBodyParser();
    this.initEJSTemplating();
    this.initDB();
    this.initSendGrid();
    this.mountRoutes();
  }

  initBodyParser() {
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  initEJSTemplating() {
    this.express.use(express.static(path.join(__dirname, "../../public")));
    this.express.set("view engine", "ejs");
    this.express.set("views", path.join(__dirname, "../../views"));
  }

  initDB() {
    mongoose.connect(process.env.MONGO_URL);
  }

  initSendGrid() {
    sgMail.setApiKey(process.env.SG_API_KEY);
    client.setApiKey(process.env.SG_API_KEY);
  }

  mountRoutes() {
    this.express.use("/", coreRoutes);
    this.express.use(errorHandler);
    this.express.use(error404Handler);
  }
}
