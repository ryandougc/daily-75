import * as sgMail from "@sendgrid/mail";

import { DataMessage }        from "../lib/interface";
import { IUser }              from "../models/user.model";
import { getAlgorithmTemplateService } from './getAlgorithmTemplate';
import { updateContactCurrentAlgService } from "./contacts_updateCurrentAlg";

export async function sendAlgorithmEmailService(contacts: Array<IUser>): Promise<DataMessage> {
  try {
    // Setup the recipient list
    let recipients = []
    for(let i = 0; i < contacts.length; i++) {
      const currentAlgTemplate = await getAlgorithmTemplateService(contacts[i].currentAlg)

      const recipient = {
        to: [
          {
            email: contacts[i].email,
          }
        ],
        dynamic_template_data: {
          subject: "Your Daily 75 Algorithm",
          algorithm: currentAlgTemplate
        },
      }
      
      recipients.push(recipient)
    }
    
    // Setup the algorithm emails
    const emailData = {
      personalizations: recipients,
      from: {
        email: process.env.SG_EMAIL_FROM_ADDRESS,
        name: process.env.SG_EMAIL_FROM_NAME,
      },
      reply_to: {
        email: process.env.SG_EMAIL_FROM_ADDRESS,
        name: process.env.SG_EMAIL_FROM_NAME,
      },
      templateId: process.env.SG_ALGORITHM_EMAIL_TEMPLATE_ID,
      asm: {
        groupId: 151505,
        groups_to_display: [
          151505
        ],
      }
    };

    // Send the algorithm Emails
    const sentMailRepsonse = await sgMail.sendMultiple(emailData);

    if (sentMailRepsonse[0].statusCode === 202) {
      // Update user's current algorithm in mongoDB and sendgrid
      for(let i = 0; i < contacts.length; i++) {
        await updateContactCurrentAlgService(contacts[i].email)
      }

      return {
        success: true,
        status: 202,
        message: "All Algorithm Emails Sent Successfully",
      };
    } else {
      return {
        success: false,
        status: sentMailRepsonse[0].statusCode,
        message: sentMailRepsonse[0].body.toString(),
      };
    }
  } catch (err) {
    console.log(err.response.body);

    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}