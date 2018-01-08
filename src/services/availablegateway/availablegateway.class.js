/* eslint-disable no-unused-vars */

//const availableGateway = require('../../config.js');

const availableGateway = require('../../available_gateway.js');

console.log('=======================');
console.log(availableGateway);


class Service {
    constructor(options) {
            this.options = options || {};
        }
        //var dirname = "/var/www/R&D/GO/All_OBpayment/4_feature_branch_plugin/OB_payment_and_invoice/src/plugin";
    find(params) {
        return Promise.resolve(
            availableGateway
        );
    }

    get(id, params) {
        return Promise.resolve({
            id,
            text: `A new message with ID: ${id}!`
        });
    }

    create(data, params) {
        if (Array.isArray(data)) {
            return Promise.all(data.map(current => this.create(current)));
        }

        return Promise.resolve(data);
    }

    update(id, data, params) {
        return Promise.resolve(data);
    }

    patch(id, data, params) {
        return Promise.resolve(data);
    }

    remove(id, params) {
        return Promise.resolve({ id });
    }
}

module.exports = function(options) {
    return new Service(options);
};

module.exports.Service = Service;