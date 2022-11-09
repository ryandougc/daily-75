const cron = require("node-cron");

cron.schedule(
  "0 7 * * *",
  () => {
    console.log("Hey");
  },
  {
    scheduled: true,
    timezone: "America/Vancouver",
  }
);
