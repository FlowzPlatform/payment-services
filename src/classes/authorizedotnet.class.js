var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
let _ = require("lodash")

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


    //########   PAYMENT    ########//


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



    //########   CUSTOMER    ########//


    createCustomer(data , callback)
    {

      console.log("inside create customer")
    	var creditCard = new ApiContracts.CreditCardType();
    	creditCard.setCardNumber(data.cardNumber);
    	creditCard.setExpirationDate('0922');

    	var paymentType = new ApiContracts.PaymentType();
    	paymentType.setCreditCard(creditCard);

      var customerBillingProfileType = new ApiContracts.CustomerAddressType();
    	customerBillingProfileType.setFirstName("paul");
    	customerBillingProfileType.setLastName("Nabarag");
    	customerBillingProfileType.setCompany("xyz");
    	customerBillingProfileType.setAddress("64 line str");
    	customerBillingProfileType.setCity("LA");
    	customerBillingProfileType.setState("ilinoy");
    	customerBillingProfileType.setZip("213212");
    	customerBillingProfileType.setCountry("AM");
    	customerBillingProfileType.setPhoneNumber("2113456786");
    	customerBillingProfileType.setFaxNumber("23232232323");

    	var customerPaymentProfileType = new ApiContracts.CustomerPaymentProfileType();
    	customerPaymentProfileType.setCustomerType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
    	customerPaymentProfileType.setPayment(paymentType);
      customerPaymentProfileType.setBillTo(customerBillingProfileType);

    	var paymentProfilesList = [];
    	paymentProfilesList.push(customerPaymentProfileType);

      var customerShippingProfileType = new ApiContracts.CustomerAddressType();

      console.log("------------------------------------------",data.address.firstName);
      customerShippingProfileType.setFirstName(data.address.firstName);
      customerShippingProfileType.setLastName(data.address.lastName);
      customerShippingProfileType.setCompany(data.address.company);
      customerShippingProfileType.setAddress(data.address.address);
      customerShippingProfileType.setCity(data.address.city);
      customerShippingProfileType.setState(data.address.state);
      customerShippingProfileType.setZip(data.address.zip);
      customerShippingProfileType.setCountry(data.address.county);
      customerShippingProfileType.setPhoneNumber(data.address.phoneNumber);
      customerShippingProfileType.setFaxNumber(data.address.faxNumber);


      var shippingProfilesList = [];
      shippingProfilesList.push(customerShippingProfileType)

    	var customerProfileType = new ApiContracts.CustomerProfileType();

    	customerProfileType.setMerchantCustomerId(data.merchantCustomerId);
    	customerProfileType.setDescription(data.description);
    	customerProfileType.setEmail(data.email);
    	customerProfileType.setPaymentProfiles(paymentProfilesList);
      customerProfileType.setShipToList(shippingProfilesList);


    	var createRequest = new ApiContracts.CreateCustomerProfileRequest();
    	createRequest.setProfile(customerProfileType);
    	createRequest.setValidationMode(ApiContracts.ValidationModeEnum.TESTMODE);
    	createRequest.setMerchantAuthentication(this.merchantAuth);

      var merchantAuthForShipping = this.merchantAuth;





    	//pretty print request
    	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
      return new Promise((resolve, reject) => {



    	var ctrl = new ApiControllers.CreateCustomerProfileController(createRequest.getJSON());

    	ctrl.execute(function(){

    		var apiResponse = ctrl.getResponse();

    		var response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);

    		//pretty print response
    		//console.log(JSON.stringify(response, null, 2));

    		if(response != null)
    		{
    			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
    			{
    				console.log('Successfully created a customer profile with id: ' + response.getCustomerProfileId());


    			}
    			else
    			{
    				console.log('Result Code: ' + response.getMessages().getResultCode());
    				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
    				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
    			}
    		}
    		else
    		{
    			console.log('Null response received');
    		}

    		resolve(response);
    	});

      })
    }

    getCustomer(data) {

      return new Promise((resolve, reject) => {
          if(!_.has(data, 'id') && _.has(data, 'gateway'))
          {
            var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();


          	var getRequest = new ApiContracts.GetCustomerProfileIdsRequest();
          	getRequest.setMerchantAuthentication(this.merchantAuth);

          	//pretty print request
          	//console.log(JSON.stringify(getRequest.getJSON(), null, 2));

          		var ctrl = new ApiControllers.GetCustomerProfileIdsController(getRequest.getJSON());

          		ctrl.execute(function(){

          			var apiResponse = ctrl.getResponse();

          			var response = new ApiContracts.GetCustomerProfileIdsResponse(apiResponse);

          			//pretty print response
          			//console.log(JSON.stringify(response, null, 2));

          			if(response != null)
          			{

          				if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
          				{
          					console.log('List of Customer profile Ids : ');
          					var profileIds = response.getIds().getNumericString();
          					for (var i=0;i<profileIds.length;i++)
          					{
          						console.log(profileIds[i].toString());
          					}
          				}
          				else
          				{
          					//console.log('Result Code: ' + response.getMessages().getResultCode());
          					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
          					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
          				}
          			}
          			else
          			{
          				console.log('Null response received');
          			}

                resolve(response);

          		});

           }else if (_.has(data, 'gateway') && _.has(data, 'id'))
           {
             var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

             var getRequest = new ApiContracts.GetCustomerProfileRequest();
             getRequest.setCustomerProfileId(data.id);
             getRequest.setMerchantAuthentication(this.merchantAuth);

             //pretty print request
             //console.log(JSON.stringify(createRequest.getJSON(), null, 2));

             var ctrl = new ApiControllers.GetCustomerProfileController(getRequest.getJSON());

             ctrl.execute(function(){

               var apiResponse = ctrl.getResponse();

               var response = new ApiContracts.GetCustomerProfileResponse(apiResponse);

               //pretty print response
               //console.log(JSON.stringify(response, null, 2));

               if(response != null)
               {
                 if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
                 {
                   console.log('Customer profile ID : ' + response.getProfile().getCustomerProfileId());
                   console.log('Customer Email : ' + response.getProfile().getEmail());
                   console.log('Description : ' + response.getProfile().getDescription());
                 }
                 else
                 {
                   //console.log('Result Code: ' + response.getMessages().getResultCode());
                   console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                   console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                 }
               }
               else
               {
                 console.log('Null response received');
               }

               resolve(response);
             });
            }
          })
      }

      updateCustomer(data) {
        return new Promise ((resolve , reject) => {
          var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

        	var customerDataForUpdate = new ApiContracts.CustomerProfileExType();
        	customerDataForUpdate.setMerchantCustomerId(data.merchantCustomerId);
        	customerDataForUpdate.setDescription(data.description);
        	customerDataForUpdate.setEmail(data.email);
        	customerDataForUpdate.setCustomerProfileId(data.customer);

        	var updateRequest = new ApiContracts.UpdateCustomerProfileRequest();
        	updateRequest.setMerchantAuthentication(this.merchantAuth);
        	updateRequest.setProfile(customerDataForUpdate);

        	//console.log(JSON.stringify(updateRequest.getJSON(), null, 2));

        	var ctrl = new ApiControllers.UpdateCustomerProfileController(updateRequest.getJSON());

        	ctrl.execute(function(){

        		var apiResponse = ctrl.getResponse();

        		var response = new ApiContracts.UpdateCustomerProfileResponse(apiResponse);

        		if(response != null)
        		{
        			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
        			{
        				console.log('Successfully updated a customer profile with id: ' + data.customer);
        			}
        			else
        			{
        				//console.log('Result Code: ' + response.getMessages().getResultCode());
        				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
        				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
        			}
        		}
        		else
        		{
        			console.log('Null response received');
        		}

        		resolve(response);
        	});
        })
      }

      deleteCustomer(data) {

        return new Promise((resolve , reject) => {
          var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

        	var deleteRequest = new ApiContracts.DeleteCustomerProfileRequest();
        	deleteRequest.setMerchantAuthentication(this.merchantAuth);
        	deleteRequest.setCustomerProfileId(data.id);

        	//pretty print request
        	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));

        	var ctrl = new ApiControllers.DeleteCustomerProfileController(deleteRequest.getJSON());

        	ctrl.execute(function(){

        		var apiResponse = ctrl.getResponse();

        		var response = new ApiContracts.DeleteCustomerProfileResponse(apiResponse);

        		//pretty print response
        		//console.log(JSON.stringify(response, null, 2));

        		if(response != null)
        		{
        			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
        			{
        				console.log('Successfully deleted a customer profile with id: ' + data.id);
        			}
        			else
        			{
        				//console.log('Result Code: ' + response.getMessages().getResultCode());
        				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
        				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
        			}
        		}
        		else
        		{
        			console.log('Null response received');
        		}

        		resolve(response);
        	});
        })
      }


      /////////  SUBSCRIPTION   ///////////

      createSubscription(data) {

        return new Promise((resolve , reject) => {
          var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

          	var interval = new ApiContracts.PaymentScheduleType.Interval();
          	interval.setLength(1);
          	interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

          	var paymentScheduleType = new ApiContracts.PaymentScheduleType();
          	paymentScheduleType.setInterval(interval);
          	paymentScheduleType.setStartDate("2020-08-30");
          	paymentScheduleType.setTotalOccurrences(5);
          	paymentScheduleType.setTrialOccurrences(0);

          	var customerProfileIdType = new ApiContracts.CustomerProfileIdType();
          	customerProfileIdType.setCustomerProfileId("1501717563");
          	customerProfileIdType.setCustomerPaymentProfileId("1501241138");
          	customerProfileIdType.setCustomerAddressId("1501271398");

          	var arbSubscription = new ApiContracts.ARBSubscriptionType();
          	arbSubscription.setName("Sample subscription");
          	arbSubscription.setPaymentSchedule(paymentScheduleType);
          	arbSubscription.setAmount(10);
          	arbSubscription.setTrialAmount(0);
          	arbSubscription.setProfile(customerProfileIdType);

          	var createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
          	createRequest.setMerchantAuthentication(this.merchantAuth);
          	createRequest.setSubscription(arbSubscription);

          	console.log(JSON.stringify(createRequest.getJSON(), null, 2));

          	var ctrl = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());

          	ctrl.execute(function(){

          		var apiResponse = ctrl.getResponse();

          		var response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);

          		console.log(JSON.stringify(response, null, 2));

          		if(response != null){
          			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
          				console.log('Subscription Id : ' + response.getSubscriptionId());
          				console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
          				console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
          			}
          			else{
          				console.log('Result Code: ' + response.getMessages().getResultCode());
          				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
          				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
          			}
          		}
          		else{
          			console.log('Null Response.');
          		}

          		resolve(response);
            })
        })

      }
}




module.exports = function(options) {
    return new AuthorizeDotNet(options);
};

module.exports.AuthorizeDotNet = AuthorizeDotNet;
