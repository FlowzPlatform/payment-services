const appHooks = require('../../app.hooks');
const stripe = require('./class/class.js');
let obj = new stripe({ 'secret_key': appHooks.xtoken });

//obj.test("from init..................................");

module.exports.paymentGateway = obj;
