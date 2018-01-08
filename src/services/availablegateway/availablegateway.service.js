// Initializes the `availablegateway` service on path `/availablegateway`
const createService = require('./availablegateway.class.js');
const hooks = require('./availablegateway.hooks');
const filters = require('./availablegateway.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'availablegateway',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/availablegateway', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('availablegateway');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
