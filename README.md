# OB_PAYMENT

> payment and invoice module


## Getting started

1. Take clone of project

2. cd OB_payment_and_invoice

    > npm install
    
    > npm start


# OB_PAYMENT_MODULE

> There are three types of payment gateway.1) stripe 2) authorize.net 3) paypal.you can use anyone for your payment.


## stripe


http://localhost:3030/payment
 

1. create payment

> json body

```sh
{
"gateway":"stripe",
"customerId":"cus_B8WriFH4b9Mt9J",
"amount":20,
"currency":"usd",
"description" : "this is new post"
}
```

2. update payment

>  json body

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

3. get

http://localhost:3030/payment?gateway=stripe&customerId=cus_B8WriFH4b9Mt9J

http://localhost:3030/payment?gateway=stripe&chargeId=ch_1ArRYUGMQxjcIs4EVgV7bG4c&customerId=cus_B8WriFH4b9Mt9J



