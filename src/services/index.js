const plan = require('./plan/plan.service.js');
const payment = require('./payment/payment.service.js');

const subscription = require('./subscription/subscription.service.js');
const customer = require('./customer/customer.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(plan);
  app.configure(payment);

  app.configure(subscription);
  app.configure(customer);
};
