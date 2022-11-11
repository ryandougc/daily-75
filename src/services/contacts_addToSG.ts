import * as client from '@sendgrid/client'
import { IUser } from '../models/user.model';

export async function addContactToSendGridService(user: IUser): Promise<boolean> {
    try {
        const data = {
            "contacts": [
              {
                email: user.email,
                custom_fields: {
                    w1_T: user.timezone,
                    w2_N: user.currentAlg
                }
              }
            ]
          };
          
          const request = {
            url: `/v3/marketing/contacts`,
            method: 'PUT' as const,
            body: data
          }
          
          await client.request(request)

          return true
    } catch(err) {
        console.log(err)

        return false
    }
}