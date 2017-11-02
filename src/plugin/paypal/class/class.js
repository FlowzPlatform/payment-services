let _ = require("lodash")

class Paypal {

    constructor(options) {

        this.options = options || {};
        this.paypal = require('paypal-rest-sdk');

        let paypalConfig = {
            "host": 'api.sandbox.paypal.com',
            "port": '',
            "api": {
                "client_id": options.client_id,
                "client_secret": options.client_secret
            }
        }

        console.log("///////////////////////////////////////////////////////", paypalConfig);

        this.paypal.configure(paypalConfig.api);

    }


    //########   PAYMENT    ########//

    createCharge(data) {
        return new Promise((resolve, reject) => {

            delete data.gateway;

            var payment_data = data;

            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44444444444", payment_data);

            // resolve(data);

            this.paypal.payment.create(payment_data, function (error, payment) {
                if (error) {
                    resolve(error);
                } else {
                    resolve(payment);
                }
            });
        })
    }


    getCharge(data) {
        console.log("inside getcharges...")
        console.log(1212);

        return new Promise((resolve, reject) => {

            if (_.has(data, 'payment_id') && _.has(data, 'gateway')) {

                this.paypal.payment.get(data.payment_id, function (error, payment) {
                    if (error) {
                        resolve(error);
                    } else {
                        resolve(payment);
                    }

                });

            } else if (_.has(data, 'gateway') && !_.has(data, 'payment_id')) {
                console.log("11");

                delete data.gateway;

                var listPayment = data;

                this.paypal.payment.list(listPayment, function (error, payment) {
                    if (error) {
                        throw error;
                    } else {
                        resolve(payment);
                        console.log("payment", payment);
                    }
                });
            }

        })
    }



    //########   REFUND    ########//


    createRefund(data) {

        console.log("inside create Refund");

        return new Promise((resolve, reject) => {

            let saleId = data.saleid
            delete data.gateway
            delete data.saleid

            this.paypal.sale.refund(saleId, data, function (error, refund) {
                if (error) {
                    resolve(error);
                } else {
                    resolve(refund);
                }
            });
        })
    }



    //########   PLAN    ########//


    createPlan(data) {

        console.log("inside create plan");

        return new Promise((resolve, reject) => {

            delete data.gateway;

            var billingPlanAttributes = data;

            this.paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
                if (error) {
                    resolve(error);
                } else {
                    resolve(billingPlan);
                }
            });
        })
    }

    updatePlan(data) {
        console.log("inside update plan");

        var billingPlanId = data.billing_plan_id;
        delete data.gateway;
        delete data.billing_plan_id;
        return new Promise((resolve, reject) => {

            console.log("billing_plan_update_attributes", data);
            console.log("billingPlanId", billingPlanId);

            var billing_plan_update_attributes = [data];



            this.paypal.billingPlan.update(billingPlanId, billing_plan_update_attributes, function (error, response) {
                if (error) {
                    resolve(error);
                } else {
                    resolve(response);
                }
            });

        })
    }

    getPlan(data) {

        console.log("inside get plan");

        return new Promise((resolve, reject) => {

            if (!_.has(data, 'plan_id') && _.has(data, 'gateway')) {
                console.log("not available data");
                delete data.gateway;

                var list_billing_plan = data;
                console.log("2222222222222222222222222222222222222222222222222222222222222222222", list_billing_plan);
                this.paypal.billingPlan.list(list_billing_plan, function (error, billingPlan) {
                    if (error) {
                        resolve(error);
                    } else {
                        resolve(billingPlan);
                    }
                });
            } else if (_.has(data, 'gateway') && _.has(data, 'plan_id')) {

                var billingPlanId = data.plan_id;

                this.paypal.billingPlan.get(billingPlanId, function (error, billingPlan) {
                    if (error) {
                        resolve(error);
                    } else {
                        resolve(billingPlan);
                    }
                });

            }
        })
    }

    createSubscription(data) {

        console.log("inside createSubscription", data);

        return new Promise((resolve, reject) => {

            if (data.action == "create") {

                delete data.action;
                delete data.gateway;
                var billingAgreementAttributes = data;

                if (data.payment_token) {
                    var paymentToken = '';
                    paymentToken = data.payment_token;

                    this.paypal.billingAgreement.execute(paymentToken, {}, function (error, billingAgreement) {
                        if (error) {
                            resolve(error);
                        } else {
                            resolve(billingAgreement);
                        }
                    });
                } else {
                    this.paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
                        if (error) {
                            resolve(error);
                        } else {
                            resolve(billingAgreement);
                        }
                    })
                }

            }


            else if (data.action == "suspend") {


                console.log("inside suspend condition")


                var billingAgreementId = data.agreement_id;
                delete data.gateway;
                delete data.agreement_id;
                delete data.action;
                var suspend_note = data;
                this.paypal.billingAgreement.suspend(billingAgreementId, suspend_note, function (error, response) {
                    if (error) {
                        resolve(error);
                    } else {
                        console.log("Suspend Billing Agreement Response");
                        resolve(response);
                    }
                });


            }

            else if (data.action == "reactivate") {


                var billingAgreementId = data.agreement_id;
                delete data.gateway;
                delete data.agreement_id;
                delete data.action;

                var reactivate_note = data;

                this.paypal.billingAgreement.reactivate(billingAgreementId, reactivate_note, function (error, response) {
                    if (error) {
                        resolve(error);
                    } else {
                        console.log("Reactivate Billing Agreement Response");
                        console.log(response);
                        resolve(response);
                    }
                });


            }


            else if (data.action == "cancel") {

                var billingAgreementId = data.agreement_id;
                delete data.gateway;
                delete data.agreement_id;
                delete data.action;
                var cancel_note = data;

                this.paypal.billingAgreement.cancel(billingAgreementId, cancel_note, function (error, response) {
                    if (error) {
                        resolve(error);
                    } else {
                        resolve(response);
                    }
                });
            }
        })
    }






    // createSubscription(data) {

    //     console.log("inside createSubscription", data);
    //     // console.log(data)
    //     var billingAgreementAttributes = data;
    //     delete data.gateway;
    //     if (data.payment_token) {
    //         var paymentToken = '';
    //         paymentToken = data.payment_token;
    //         return new Promise((resolve, reject) => {
    //             this.paypal.billingAgreement.execute(paymentToken, {}, function (error, billingAgreement) {
    //                 if (error) {
    //                     resolve(error);
    //                 } else {
    //                     resolve(billingAgreement);
    //                 }
    //             });
    //         });
    //     } else {
    //         return new Promise((resolve, reject) => {
    //             this.paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
    //                 if (error) {
    //                     resolve(error);
    //                 } else {
    //                     resolve(billingAgreement);
    //                 }
    //             })
    //         })
    //     }
    // }

    /** Show agreement details */

    getSubscription(data) {

        console.log("getsubscriptions");
        console.log("data", data);

        return new Promise((resolve, reject) => {


            var billingAgreementId = data.agreement_id;


            this.paypal.billingAgreement.get(billingAgreementId, function (error, billingAgreement) {
                if (error) {
                    resolve(error);
                } else {
                    resolve(billingAgreement);
                }
            });

        })
    }

    updateSubscription(data) {
        console.log("inside update Subscription", data);
        var billingAgreementId = data.agreement_id;
        delete data.gateway;
        delete data.agreement_id;
        var billing_agreement_update_attributes = [data];
        return new Promise((resolve, reject) => {
            this.paypal.billingAgreement.update(billingAgreementId, billing_agreement_update_attributes, function (error, response) {
                if (error) {
                    resolve(error);
                } else {
                    resolve(response);
                }
            });
        })
    }

}

var isoDate = new Date();
isoDate.setSeconds(isoDate.getSeconds() + 4);
isoDate.toISOString().slice(0, 19) + 'Z';

module.exports = function (options) {
    return new Paypal(options);
};

module.exports.Paypal = Paypal;