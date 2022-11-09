const client = require('@sendgrid/client');
client.setApiKey('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');


const data = {
    "contacts": [
      {
        email: "thechriztmaznoob@gmail.com",
        custom_fields: {
            w1_T: 'America/Vancouver',
            w2_N: 1
        }
      }
    ]
  };
  
  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }
  
  client.request(request)