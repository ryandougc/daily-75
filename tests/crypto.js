const crypto = require('crypto')



const hmac1 = crypto.createHmac('sha256', 'test')
                    .update("123456789")
                    .digest('hex');

const hmac2 = crypto.createHmac('sha256', 'test')
.update("123456789")
.digest('hex');


console.log(hmac1 !== hmac2)