import * as sgMail from "@sendgrid/mail";

import { IUser } from "../models/user.model";

export async function sendSubscriptionConfirmationEmailService(
  user: IUser,
  subscriptionConfirmationLink: String
): Promise<boolean> {
  try {
    const emailContent = {
      from: {
        email: process.env.EMAIL_FROM_ADDRESS,
        name: process.env.EMAIL_FROM_NAME,
      },
      reply_to: {
        email: process.env.EMAIL_FROM_ADDRESS,
        name: process.env.EMAIL_FROM_NAME,
      },
      to: {
        email: user.email,
        name: user.name,
      },
      templateId: process.env.SG_CONFIRM_SUBSCRIPTION_EMAIL_TEMPLATE_ID,
      dynamicTemplateData: {
        subject: "Confirm your Daily 75 Subscription",
        name: user.name,
        subscriptionConfirmationLink: subscriptionConfirmationLink,
      },
    };

    const sentMailRepsonse = await sgMail.send(emailContent);

    if (sentMailRepsonse[0].statusCode === 202) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);

    return false;
  }
}
