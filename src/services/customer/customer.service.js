// Initializes the `customer` service on path `/customer`
const createService = require('./customer.class.js');
const hooks = require('./customer.hooks');
const filters = require('./customer.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'customer',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/customer', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('customer');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
