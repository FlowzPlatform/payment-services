const authdotnet = require('./class/class.js');
const errors = require('feathers-errors');

module.exports.initObject = function(apiHeaders) {
    console.log("inside fn.....................................");
    if (!('x-api-token' in apiHeaders) && !('x-api-login' in apiHeaders)) {
        throw new errors.BadRequest({ errors: { headers: 'Invalid headers' } });
    } else {
        let obj = new authdotnet({
            'api_login_key': apiHeaders['x-api-login'],
            'api_trans_key': apiHeaders['x-api-token']
        });
        return obj;
    }
}

//obj.test("from init.................................."); module.exports.paymentGateway = obj; module.exports.schema = schema;
