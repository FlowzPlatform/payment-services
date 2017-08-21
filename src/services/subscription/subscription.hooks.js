const func = require("../../../functions.js");

module.exports = {
    before: {
        all: [
            hook => before_all_hook_subscription(hook)
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


before_all_hook_subscription = async hook => {
    console.log("###########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    func.validateGateway(hook);
}


