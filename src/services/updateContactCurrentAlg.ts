import mongoose from "mongoose"

import { userSchema, IUser } from "../models/user.model"
import { addContactToSendGridService } from "./addContactToSendGrid"

const User = mongoose.model('User', userSchema)

export async function updateContactCurrentAlgService(userEmail: string): Promise<boolean> {
    try {
    // Update Mongo User
    await User.updateOne({ email: userEmail }, {$inc : { currentAlg: 1 }}).exec()

    // Update Sendgrid User
    const user: IUser = await User.findOne({ email: userEmail })

    await addContactToSendGridService(user)

    return true
    } catch(err) {
        console.log(err)
        
        return false
    }
}