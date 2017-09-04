const assert = require('assert');
const app = require('../../src/app');

describe('\'refund\' service', () => {
  it('registered the service', () => {
    const service = app.service('refund');

    assert.ok(service, 'Registered the service');
  });
});
