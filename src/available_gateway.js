module.exports = {

    gateways: [{
            name: 'Stripe',
            keys: ['secret']
        },
        {
            name: 'Authorize.net',
            keys: ['api_login_id', 'transaction_key']
        },
        {
            name: 'Paypal',
            keys: ['api_client_id', 'secret']
        }
    ]
}