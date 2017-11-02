// Initializes the `plan` service on path `/plan`
const createService = require('./plan.class.js');
const hooks = require('./plan.hooks');
const filters = require('./plan.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'plan',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/plan', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('plan');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
