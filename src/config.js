// module.exports =[
//  {gateway: 'Stripe' , value : 'stripe'},
//  {gateway : 'Authrize.Net' , value : 'authdotnet'},
//  {gateway : 'Paypal' , value : 'paypal'}
// ]



var fs = require("fs");
var arr = [];
var p = __dirname + '/plugin';
console.log('111111111111111111');
console.log(p);
fs.readdir(p, function(err, files) {
    if (err) {
        throw err;
    }

    files.forEach(function(file) {
        console.log(file);
        arr.push({ gateWay: file, value: file })

    });
    console.log(arr);
});

module.exports = arr