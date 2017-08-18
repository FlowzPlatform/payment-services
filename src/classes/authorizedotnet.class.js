class AuthorizeDotNet {
    constructor(options) {
        console.log("inside authorize-dot-net class..");
        console.log(options)
            //const Ajv = require('ajv');
        this.options = options || {};
    }

    doCharge() {
        console.log("insiede docharge..");
    }
}

module.exports = function(options) {
    return new AuthorizeDotNet(options);
};

module.exports.AuthorizeDotNet = AuthorizeDotNet;