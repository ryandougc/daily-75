import * as client from '@sendgrid/client'


export async function getContactsService() {
    try { 
        client.setApiKey(process.env.SG_API_KEY);     

        const request = {
            url: `/v3/marketing/contacts`,   // /v3/contactdb/lists/{list_id}/recipients
            method: 'GET' as const
          }

        const contactsResponse = await client.request(request)

        const conatcts = contactsResponse[1].result

        return conatcts
    } catch(err) {
        console.log(err.response.body)
    }
}