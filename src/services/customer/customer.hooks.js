const func = require("../../../functions.js");

module.exports = {
  before: {
    all: [
      hook => before_all_hook_customer(hook)
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

function before_all_hook_customer(hook) {
    console.log("before hook.." + this.XApiToken);
    func.validateGateway(hook);
}
