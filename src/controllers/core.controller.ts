import mongoose from 'mongoose';
import { generateToken, generateHMAC } from '../lib/utils';
import { IUser, userSchema } from '../models/user.model'
import { subConfSchema } from '../models/subConf.model'
import { sendSubscriptionConfirmationEmailService } from '../services/sendSubscriptionConfirmationEmail';
import { getContactsService } from '../services/getContacts';
import { sendAlgorithmEmailService } from '../services/sendAlgorithmEmail';
import { addContactToSendGridService } from '../services/addContactToSendGrid';

const User = mongoose.model('User', userSchema)
const SubConf = mongoose.model('SubConf', subConfSchema)

export const getLandingPage = async (req, res, next) => {
  res.render("index.ejs");
};
export const subscribe = async (req, res, next) => {
  try {
    const userEmail = req.body.email;

    // Check if user is already subscribed, otherwise make a new user
    let user = await User.findOne({ email: userEmail })

    if(user) {
      if(user.subscribed) {
        return next({
          success: false,
          status: 409,
          message: "You are already subscribed",
        });
      }
    }else {
      user = await new User({
        email: userEmail
      }).save()
    }

    // Generate Confirmation link
    const token = await generateToken(64)
  
    const userIdHash = await generateHMAC(user._id.toString())
  
    const subscriptionConfirmationLink = `${process.env.BASE_URL}/subscription/confirmed?email=${user.email}&securityCode=${userIdHash}&token=${token}`

    // Save subscription data in database
    const newSubConf = await new SubConf({
      userEmail: user.email,
      userId: user._id.toString(),
      token: token
    }).save()
  
    // Send confirmation email
    await sendSubscriptionConfirmationEmailService(user, subscriptionConfirmationLink)
  
    res.status(200).render("subscriptionPendingPage.ejs");
  } catch(err) {
    console.log(err)
    
    return next({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }

};
export const getSubscriptionConfirmed = async (req, res, next) => {
  try {
    const userEmail = req.query.email
    const userIdHash = req.query.securityCode
    const token = req.query.token

    console.log(userEmail)
    console.log(userIdHash)
    console.log(token)
  
    // Search email in confirmation database
    const userSubConf = await SubConf.findOne({ userEmail: userEmail })

    console.log(userSubConf)
  
    // hash userid and match to userIdHash
    // Also check if the tokens match
    const comparisonUserIdHash = await generateHMAC(userSubConf.userId)
  
    if(comparisonUserIdHash !== userIdHash || token !== userSubConf.token) {
      console.log("link issue")
      return next({
        success: false,
        status: 401,
        message: "Your link is invalid",
      })
    }
  
    // Update user's subscription status to true
    await User.updateOne({ _id: userSubConf.userId }, { subscribed: true  })
  
    await userSubConf.deleteOne({ _id: userSubConf._id })
  
    // Add user to sendgrid contact list
    const user: IUser = await User.findOne({ _id: userSubConf.userId })
  
    await addContactToSendGridService(user)
  
    res.status(200).render("subscriptionConfirmedPage.ejs");
  } catch(err) {
    console.log(err)

    return next({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};
export const unsubscribe = async (req, res, next) => { // Link this route to the unsubscribe button in sendgrid
  try {
    const userEmail = req.query.email
    const userIdHash = req.query.securityCode
    const token = req.query.token // Research how unsubscribe tokens work

    await User.updateOne({ email: userEmail }, { subsribed: false })
      
    // Render unsubscribe successful page
    res.render("unsubscribe.ejs")
  } catch(err) {
    console.log(err)

    return next({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
}