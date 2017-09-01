// Initializes the `refund` service on path `/refund`
const createService = require('./refund.class.js');
const hooks = require('./refund.hooks');
const filters = require('./refund.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'refund',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/refund', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('refund');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
