# OB_PAYMENT

> payment and invoice module


## Getting started

1. Take clone of project

2. cd OB_payment_and_invoice

    > npm install
    
    > npm start

# OB_PAYMENT_MODULE

> There are three types of payment gateway.1) stripe 2) authorize.net 3) paypal.you can use anyone for your payment.


## Stripe

http://localhost:3030/payment
 

>### create payment

##### json body

```sh
{
"gateway":"stripe",
"customerId":"cus_B8WriFH4b9Mt9J",
"amount":20,
"currency":"usd",
"description" : "this is new post"
}
```

>### update payment

##### json body

```sh
{
"gateway":"stripe",
"chargeId":"ch_1ArRYUGMQxjcIs4EVgV7bG4c",
"description" : "this is new patch",
"shipping":{
"address":{
"line1":"",
"city":"",
"country":"IN"
},
"name":"your name"
}
}
```

>### get payment

http://localhost:3030/payment?gateway=stripe&customerId=cus_B8WriFH4b9Mt9J

http://localhost:3030/payment?gateway=stripe&chargeId=ch_1ArRYUGMQxjcIs4EVgV7bG4c&customerId=cus_B8WriFH4b9Mt9J


## Authdotnet


>### Payment for existing customer

##### json body

```sh
{
"gateway":"authdotnet",
"amount":20,
"customerId":"1501802960",
"customerPaymentProfieId":"1501324492",
    "isCustomer":true
}
```

>### Payment for random customer

   ```sh
 {
"gateway":"authdotnet",
 "amount": 200,
 "cardNumber":"4242424242424242",
 "expMonth":"05",
 "expYear":"22",
 "cvc":"235",
 "isCustomer":false
}
```

## Paypal

>### create payment


##### json body


```sh
{
"gateway":"paypal",
"intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "payment_card": {
        "type": "visa",
         "number": "4242424242424242",
          "expire_month":11,
        "expire_year": 2018,
       "cvv2": 123,
        "first_name": "Joe",
        "last_name": "Shopper",
        "billing_country": "US",
        "billing_address": {
          "line1": "52 N Main ST",
          "city": "Johnstown",
          "state": "OH",
          "postal_code": "43210",
          "country_code": "US"
        }
      }
    }]
  },
  "transactions": [{
    "amount": {
      "total": "7.47",
      "currency": "USD",
      "details": {
        "subtotal": "7.41",
        "tax": "0.03",
        "shipping": "0.03"
      }
    },
    "description": "This is the payment transaction description"
  }]
}
```

>###get payment

 #####  get all payment data
 
 localhost:3030/payment?gateway=paypal
 
 ##### get a payment data with limitation by count
 
 localhost:3030/payment?gateway=paypal&count=25
 
 ##### Get perticular payment data by payment id
 
 localhost:3030/payment?gateway=paypal&payment_id=PAY-7CY149809C8463721LGXYSQY

