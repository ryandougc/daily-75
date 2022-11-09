"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("node-cron");
// Pull contact list
// Get email send lists by timezone
// For each time zone, schedule an email at 7am
try {
    cron.schedule("* * 7 * * 1-5", () => {
        // Run every week day at 7am
        console.log("Second");
    }, {
        scheduled: true,
        timezone: "America/Vancouver",
    });
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=scheduleEmail.js.map