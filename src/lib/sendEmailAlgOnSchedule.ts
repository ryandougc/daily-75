import * as path from "path";
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import * as cron from 'node-cron'
import * as sgMail from '@sendgrid/mail'
import * as client from '@sendgrid/client'

import { sendAlgorithmEmailService } from "../services/sendAlgorithmEmail";
import { getContactsService } from "../services/contacts_getAll";

dotenv.config({ path: path.join(__dirname, "../../.env") });

// cron.schedule(
//     "0 7 * * 1,2,3,4,5", // Run at 7am each week day
//     async () => {
//         await sendAlgorithmEmailService()
//     },
//     {
//       scheduled: true,
//       timezone: "America/Vancouver",
//     }
// );

run().catch(err => console.log)

async function run() {
  await mongoose.connect(process.env.MONGO_URL);

  sgMail.setApiKey(process.env.SG_API_KEY);
  client.setApiKey(process.env.SG_API_KEY);

  const contacts = await getContactsService()

  await sendAlgorithmEmailService(contacts)
}