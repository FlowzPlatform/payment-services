const func = require("../../../functions.js")

module.exports = {
  before: {
    all: [
      hook => before_all_payment(hook)
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

function before_all_payment(hook)
{
  console.log("before hook..");
  func.validateGateway(hook);
}
