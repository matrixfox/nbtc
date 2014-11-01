var request = require('request');
var nodemailer = require("nodemailer");
var lifx = require('lifx');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
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

// Lifx = Visual Alerts
var lx = lifx.init();

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


        // Lower Alarm
        if (info.last < lowerAlarm && b == true) {
            // Lifx Bulb *GREEN*
            lx.lightsColour(0x3ebf, 0xffff, 0x8000, 0x0af0, 0x0513);

            b = false;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: "Matrixfox <matrixfox@gmail.com>", // sender address
                to: "matrixfox@gmail.com", // list of receivers
                subject: "Bitcoin Alert", // Subject line
                html: '<p>BUY OUT - Last: <b>' + info.last + " </b>is under your Alarm Price: <b> " + lowerAlarm + '</b></p>' // html body
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
        if (info.last > overAlarm && s == true) {
            // Lifx Bulb *RED*
            lx.lightsColour(0x105, 0xffff, 0x8000, 0x0af0, 0x0513);

            s = false;
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: "Matrixfox <matrixfox@gmail.com>", // sender address
                to: "matrixfox@gmail.com", // list of receivers
                subject: "Bitcoin Alerts", // Subject line
                html: '<p>SELL OFF - Last: <b>' + info.last + " </b>is over your Alarm Price: <b> " + overAlarm + '</b></p>' // html body
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
