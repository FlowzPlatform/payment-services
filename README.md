# OB_PAYMENT

> payment and invoice module


## Getting started

1. Take clone of project

2. cd OB_payment_and_invoice

> npm install

> npm start

# OB_PAYMENT_MODULE

> we are providing three payment gateway services(stripe, authorize.net, paypal) for  payment.user can use any of them for payment.


## Stripe

###http://localhost:3030/payment


### About

user can use stripe payment service by passing client id and client secret in authorization header.

####generate client id and client secret

https://dashboard.stripe.com/login?redirect=%2F

####pass client id secret in authorization header

x-api-token:"your secret key"

 

>### create payment

##### json body

```
{
"gateway":"stripe",
"customerId":"customer id",
"amount":provide amount,
"currency":"currency code",
"description" : "description of post"
}
```

>### update payment

##### json body

```
{
"gateway":"stripe",
"chargeId":"charge id",
"description" : "update description",
"shipping":{
"address":{
"line1":"address",
"city":"provide city",
"country":"country code"
},
"name":"your name"
}
}
```

>### get payment

###### Get all charge data for customer using customerId. Pass the query params                             

http://localhost:3030/payment?gateway=stripe&customerId=your customer id

###### Get perticular charge data by chargeid

http://localhost:3030/payment?gateway=stripe&chargeId="charge id"&customerId="customer id"


>### refund payment

http://localhost:3030/customer

#### create

###### Create a fully  refund for particular charge by giving chargeId and whole amount                       

```
{
"gateway":"stripe",
"chargeId":"charge id(ex. ch_1AyzaRGMQxjcIs4EK8fuMJ2l)",
"amount":provide amount (ex.100)
}                                                                 ```

###### Create a partialy  refund for particular charge by giving chargeId and some amount 

```
{
"gateway":"stripe",
"chargeId":" charge id(ex.ch_1AyzaRGMQxjcIs4EK8fuMJ2l)",
"amount":partial amount(ex.100)
}
```  

#### update

###### Updates the specified refund by setting the values of the parameters passed.

```
{
"gateway":"stripe",
    "id": "refund id(ex.re_1Ax9amGMQxjcIs4EV9babkAu)",
    "metadata": {
    "orederid":"(ex.123456)"
    }
}
``` 

#### get

###### Retrieves the details of an existing refund by giving refund Id

http://localhost:3030/refund?gateway=stripe&id="refund id"

###### Returns a list of all refunds you’ve previously created

http://localhost:3030/refund?gateway=stripe 

###### Returns a list of all refunds that previously created giving limit and pagination

http://localhost:3030/refund?gateway=stripe&limit=2&starting_after="refund id"                         

## Authdotnet

### http://localhost:3030/payment

### About

user can use Authorize.net payment service by passing client id and client secret in authorization header.

####generate client id and client secret

https://developer.authorize.net

####pass client id secret in authorization header

x-api-login:"API LOGIN ID"

x-api-token:"TRANSACTION KEY"



>### Payment for existing customer

##### json body

```
{
"gateway":"authdotnet",
"amount":provide amount,
"customerId":"your customer id",
"customerPaymentProfieId":"your customerPaymentProfieId",
    "isCustomer":true
}
```

>### Payment for random customer

```
 {
"gateway":"authdotnet",
 "amount": your amount,
 "cardNumber":"your card number",
 "expMonth":"expiration month",
 "expYear":"expiration year",
 "cvc":"your cvv number",
 "isCustomer":false
}
```
                       

###### create a fully refund for particular payment by giving sale id and whole amount.

##### json body

```
{
"gateway":"paypal",
"saleid":"your sale id.(ex.14J21811R910183D)",
"amount": {
    "total": "total amount",
    "currency": "currency code.(ex.USD)"
  }
}
```

>### refund payment

#### create

######   Create a fully refund for particular payment by giving transaction id and whole amount

```
{
"gateway":"authdotnet",
"transactionRequest":{
"transactionType":"REFUNDTRANSACTION",
"amount":"fully amount",
"refTransId":"Merchant-assigned reference ID",
            "payment": {
                "creditCard": {
                    "cardNumber": "credit card number",
                    "expirationDate": "XXXX"
                }
            }
}
}
```

######  Create a partially  refund for particular payment by giving transaction id and some amount

```                                                                                                                                   {
"gateway":"authdotnet",
"transactionRequest":{
"transactionType":"REFUNDTRANSACTION",
"amount":"partial amount",
"refTransId":"Merchant-assigned reference ID",
            "payment": {
                "creditCard": {
                    "cardNumber": "credit card number",
                    "expirationDate": "XXXX"
                }
            }
}
}
```

## Paypal

### http://localhost:3030/payment

### About

user can use paypal payment service by passing client id and client secret in authorization header.

####generate client id and client secret

https://developer.paypal.com/

####pass client id secret in authorization header

x-api-login:"your client id"

x-api-token:"your client secret"




>### create payment

##### json body

```
{
"gateway":"paypal",
"intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "payment_card": {
        "type": "ex.visa",
         "number": "your card number(ex.4242424242424242)",
          "expire_month":expiration month,
        "expire_year": expiration year,
       "cvv2": cvv number,
        "first_name": "first name",
        "last_name": "last name",
        "billing_country": "country code",
        "billing_address": {
          "line1": "address",
          "city": "your city",
          "state": "state code (ex.OH)",
          "postal_code": "postal code",
          "country_code": "country code (ex.US)"
        }
      }
    }]
  },
  "transactions": [{
    "amount": {
      "total": "transaction amount",
      "currency": "currency code.ex.USD",
      "details": {
        "subtotal": "subtotal amount",
        "tax": "tax charge",
        "shipping": "shipping charge"
      }
    },
    "description": "This is the payment transaction description"
  }]
}
```

>### get payment

###### get all payment data
 
 http://localhost:3030/payment?gateway=paypal
 
###### getpayment data with limitation by count
 
 http://localhost:3030/payment?gateway=paypal&count=25
 
###### get particular payment data by payment id
 
 http://localhost:3030/payment?gateway=paypal&payment_id=your payment id

>### refund payment

http://localhost:3030/payment

###### create a fully refund for particular payment by giving sale id and whole amount.

##### json body

```
{
"gateway":"paypal",
"saleid":"your sale id.(ex.14J21811R910183D)",
"amount": {
    "total": "total amount",
    "currency": "currency code.(ex.USD)"
  }
}
```

###### create a partial refund for particular payment by giving sale id and amount.

```
{
"gateway":"paypal",
"saleid":"sale id.(ex.14J21811R910183D",
"amount": {
    "total": "partial amount",
    "currency": "currency code.(ex.USD)"
  }
}
```