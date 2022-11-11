import { IUser, User } from '../models/user.model';

export async function getContactsService(): Promise<IUser[]>  {
    try {        
        const contacts: Array<IUser> = await User.find({ subscribed: true }, 'email name joinedDate tier subscribed currentAlg timezone')

        console.log(contacts)

        return contacts
    } catch(err) {
        console.log(err.response.body)
    }
}