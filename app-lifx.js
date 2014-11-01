var request = require('request');
var lifx = require('lifx');

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
        var json = JSON.parse(body);


        // Lower Alarm
        if (json.last < lowerAlarm && b == true) {
            // Lifx Bulb *GREEN*
            lx.lightsColour(0x3ebf, 0xffff, 0x8000, 0x0af0, 0x0513);
            b = false;
            setTimeout(function(){process.kill()}, 1000);
        }// end lowerAlarm



        // Over Alarm
        if (json.last > overAlarm && s == true) {
            // Lifx Bulb *RED*
            lx.lightsColour(0x105, 0xffff, 0x8000, 0x0af0, 0x0513);
            s = false;
            setTimeout(function(){process.kill()}, 1000);
        }// end overAlarm
    }
}//end callback
request(header, callback);
clearInterval(myVar);
}
myVar = setInterval(function(){nodeify()}, 5000);
