var request = require('request');
// var mongoose = require('mongoose');
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "********************",
        pass: "********************"
    }
});

var header = {
    url: 'https://www.bitstamp.net/api/ticker/',
    headers: {
        'User-Agent': 'nbtc'
    }
};

// mongoose.connect('mongodb://localhost/bitcoin');

// // Doctype schema
// var Schema = mongoose.Schema;
// var schema = new Schema({
//     high: String,
//     last: String,
//     timestamp: String,
//     bid: String,
//     volume: String,
//     low: String,
//     ask: String
// }, { versionKey: false});
// schema.set('toObject', { getters: true });

// // Grabbing the schema and connecting to mongodb database
// var Bitcoin = mongoose.model('bitstamp', schema);

//Set Alerts
// if price drops lower than =
// BUY
var lowerAlarm = parseFloat('600.99');

// if price rises higher than =
// SELL
var overAlarm = parseFloat('700.99');

// SPAM FILTER OUTSIDE OF FUNCTIONS?
var s = true;
var b = true;

var myVar = setInterval(function(){nodeify()}, 5000);


function nodeify() {


function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);


        // dumping json var
        // var chart = new Bitcoin(info);
        //     chart.save(function (err) {
        //       if (err) console.warn(err.message);
        //       // mongoose.connection.close();
        //     });


        // Lower Alarm
        if (info.last < lowerAlarm && b == true) {
            b = false;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: "Matrixfox <matrixfox@gmail.com>", // sender address
                to: "matrixfox@gmail.com", // list of receivers
                subject: "Bitcoin Alert", // Subject line
                // text: "BUY " + info.last + " is less than " + lowerAlarm, // plaintext body
                html: '<p>BUY OUT - Last: <b>' + info.last + " </b>is under your Alarm Price: <b> " + lowerAlarm + '</b></p>' // html body
            }


            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }
                // else{
                //     console.log("Message sent: " + response.message)
                // }

                // if you don't want to use this transport object anymore, uncomment following line
                smtpTransport.close(); // shut down the connection pool, no more messages
            });
        }// end lowerAlarm


        // Over Alarm
        if (info.last > overAlarm && s == true) {
            s = false;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: "Matrixfox <matrixfox@gmail.com>", // sender address
                to: "matrixfox@gmail.com", // list of receivers
                subject: "Bitcoin Alerts", // Subject line
                // text: "SELL " + info.last + " is over than" + overAlarm, // plaintext body
                html: '<p>SELL OFF - Last: <b>' + info.last + " </b>is over your Alarm Price: <b> " + overAlarm + '</b></p>' // html body
            }


            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }
                // else{
                //     console.log("Message sent: " + response.message);
                // }

                // if you don't want to use this transport object anymore, uncomment following line
                smtpTransport.close(); // shut down the connection pool, no more messages
            });
        }// end overAlarm


    }
}//end callback
request(header, callback);
clearInterval(myVar);
}
myVar = setInterval(function(){nodeify()}, 5000);