var WebSocketClient = require('websocket').client;
var lifx = require('lifx');

var client = new WebSocketClient();
var lx = lifx.init();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket client connected');
    connection.on('error', function(error) {
    console.log("Connection Error: " + error.toString());
});

connection.on('close', function() {
    console.log('echo-protocol Connection Closed');
});

connection.on('message', function(message) {

    // lx.lightsColour(hue,    saturation, luminance, whiteColour, fadeTime);
    // lx.lightsColour(0x105, 0xffff, 0x8000, 0x0af0, 0x0513);//red
    // lx.lightsColour(0x1900, 0xffff, 0x8000, 0x0af0, 0x0513);//orange
    // lx.lightsColour(0x2666, 0xbc36, 0x8000, 0x0af0, 0x0513);//yellow
    // lx.lightsColour(0x3ebf, 0xffff, 0x8000, 0x0af0, 0x0513);//green
    // lx.lightsColour(0xb693, 0xffff, 0x8000, 0x0af0, 0x0513);//blue
    // lx.lightsColour(0xcc15, 0xffff, 0x8000, 0x0af0, 0x0513);//purple

    var hue = [0x105,0x1900,0x2666,0x3ebf,0xb693,0xcc15];
    var saturation = [0xffff,0xffff,0xbc36,0xffff,0xffff,0xffff];

    var number = Math.floor(Math.random() * 6);

    // lx.lightsColour(hue[number], saturation[number], 0x8000, 0x0af0, 0x0000);//flash
    lx.lightsColour(hue[number], saturation[number], 0x8000, 0x0af0, 0x0513);//fade

});

    function sendData() {
        if (connection.connected) {
            connection.send("{\"op\":\"unconfirmed_sub\"}")
        }
    }
    sendData();
});

client.connect('wss://ws.blockchain.info/inv');
