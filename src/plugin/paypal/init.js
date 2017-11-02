const paypal = require('./class/class.js');
const errors = require('feathers-errors');

module.exports.initObject = function(apiHeaders) {
    console.log("inside fn.....................................");
    if (!('x-api-token' in apiHeaders) && !('x-api-login' in apiHeaders)) {
        throw new errors.BadRequest({ errors: { headers: 'Invalid headers' } });
    } else {
        let obj = new paypal({
            'client_id': apiHeaders['x-api-login'],
            'client_secret': apiHeaders['x-api-token']
        });
        return obj;
    }
}
