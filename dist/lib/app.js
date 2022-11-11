"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
const client = require("@sendgrid/client");
const mongoose_1 = require("mongoose");
const core_route_1 = require("../routes/core.route");
const errorRoutes_1 = require("../routes/errorRoutes");
class App {
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
        mongoose_1.default.connect(process.env.MONGO_URL);
    }
    initSendGrid() {
        sgMail.setApiKey(process.env.SG_API_KEY);
        client.setApiKey(process.env.SG_API_KEY);
    }
    mountRoutes() {
        this.express.use("/", core_route_1.router);
        this.express.use(errorRoutes_1.errorHandler);
        this.express.use(errorRoutes_1.error404Handler);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map