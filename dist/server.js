"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
const app_1 = require("./lib/app");
dotenv.config({ path: path.join(__dirname, "../.env") });
const app = new app_1.default().express;
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err)
        return console.log(err);
    return console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=server.js.map