var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;

class AuthorizeDotNet {
    constructor(options) {
        console.log("inside authorize-dot-net class..");
        console.log(options)
            //const Ajv = require('ajv');
        this.options = options || {};

        this.merchantAuth = new ApiContracts.MerchantAuthenticationType();
        this.merchantAuth.setName(options.api_login_key);
        this.merchantAuth.setTransactionKey(options.api_trans_key);
        console.log(this.merchantAuth);
    }

    doCharge(data) {

        console.log("insiede docharge..");

        var creditCard = new ApiContracts.CreditCardType();
        creditCard.setCardNumber(data.cardNumber);
        creditCard.setExpirationDate(data.expMonth + data.expYear);
        creditCard.setCardCode(data.cvc);

        var paymentType = new ApiContracts.PaymentType();
        paymentType.setCreditCard(creditCard);

        var transactionRequestType = new ApiContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setPayment(paymentType);
        transactionRequestType.setAmount(data.amount);

        var createRequest = new ApiContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(this.merchantAuth);
        createRequest.setTransactionRequest(transactionRequestType);

        console.log(JSON.stringify(createRequest.getJSON(), null, 2));

        return new Promise((resolve, reject) => {

            var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

            ctrl.execute(function() {

                var apiResponse = ctrl.getResponse();

                var response = new ApiContracts.CreateTransactionResponse(apiResponse);

                //pretty print response
                console.log(JSON.stringify(response, null, 2));

                if (response != null) {
                    if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                        if (response.getTransactionResponse().getMessages() != null) {
                            console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
                            console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
                            console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
                            console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
                        } else {
                            console.log('Failed Transaction.');
                            if (response.getTransactionResponse().getErrors() != null) {
                                console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                                console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                            }
                        }
                    } else {
                        console.log('Failed Transaction. ');
                        if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {

                            console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                            console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                        } else {
                            console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                            console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                        }
                    }
                } else {
                    console.log('Null Response.');
                }

                resolve(response);
            });
        })
    }
}

module.exports = function(options) {
    return new AuthorizeDotNet(options);
};

module.exports.AuthorizeDotNet = AuthorizeDotNet;