import * as path from "path";
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import * as cron from 'node-cron'

import { IUser, userSchema } from '../models/user.model'
import { sendAlgorithmEmailService } from "../services/sendAlgorithmEmail";

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

  const User = await mongoose.model('User', userSchema)
  
  const contacts: Array<IUser> = await User.find({}, 'email name joinedDate tier subscribed currentAlg timezone')
    
  await sendAlgorithmEmailService(contacts)
}