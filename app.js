var request = require('request');
var nodemailer = require("nodemailer");
var config = require('./package.json');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
      auth: {
          user: config.user,
          pass: config.passwd
      }
});

var header = {
    url: 'https://www.bitstamp.net/api/ticker/',
    headers: {
        'User-Agent': 'nbtc'
    }
};

//Set Alerts
// if price drops lower than =
// BUY
var lowerAlarm = parseFloat(config.buy);

// if price rises higher than =
// SELL
var overAlarm = parseFloat(config.sell);

// SPAM FILTER OUTSIDE OF FUNCTIONS?
var s = true;
var b = true;

var myVar = setInterval(function(){nodeify()}, 5000);


function nodeify() {

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        // Parsing JSON
        var json = JSON.parse(body);

        // Lower Alarm
        if (json.last < lowerAlarm && b == true) {
            b = false;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: config.user, // sender address
                to: config.user, // list of receivers
                subject: "Bitcoin Alert", // Subject line
                html: '<p>BUY OUT - Last: <b>' + json.last + " </b>is under your Alarm Price: <b> " + lowerAlarm + '</b></p>' // html body
            }


            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                    process.kill();
                }
            });
        }// end lowerAlarm


        // Over Alarm
        if (json.last > overAlarm && s == true) {
            s = false;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: config.user, // sender address
                to: config.user, // list of receivers
                subject: "Bitcoin Alerts", // Subject line
                html: '<p>SELL OFF - Last: <b>' + json.last + " </b>is over your Alarm Price: <b> " + overAlarm + '</b></p>' // html body
            }


            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                    process.kill();
                }
            });
        }// end overAlarm
    }
}//end callback
request(header, callback);
clearInterval(myVar);
}
myVar = setInterval(function(){nodeify()}, 5000);
