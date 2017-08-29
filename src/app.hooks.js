// Application hooks that run for every service
const logger = require('./hooks/logger');

module.exports = {
    before: {
        all: [
            hook => before_all_service(hook)
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [logger()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [logger()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};

function before_all_service(hook) {
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& " , hook);
    //console.log("bfore all service :::::::::::::: " + this.XApiToken)
    module.exports.xtoken = this.XApiToken;
    if (this.XApiLogin) {
        module.exports.xtokenlogin = this.XApiLogin;
    }
}
