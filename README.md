nbtc
====

She parses the json ticker from Bitstamp, and stores it in a mongoDB collection aaannnd, sends alarming emails. Some extra nodejs apps were included. I was inspired by a YouTube video that had a Lifx Wi-Fi bulb. It was a python websocket script flashing to Blockchain.info transactions.

Getting Started
===

<b>Note:</b> This repository requires the following npm packages,<br>
request, nodemailer, mongodb, mongoose, websocket and lifx.

1: Open a terminal. (control + command + t)

        ฿ git clone git@github.com:matrixfox/nbtc.git
        ฿ cd nbtc
        ฿ npm install

2: Edit "package.json" to your email and password. Also, set the amount for the alarm price.

        24| "user" : "gmail.user@gmail.com",
        25| "passwd" : "userpass",
        26| "buy": "600.99",
        27| "sell": "700.99"

3: Then go back to the terminal and run the "app.js" file.

        ฿ node app.js


฿ Donations
===========
12exE5ZdNMyFN4NVwsuhHuqKdRgb3T2WH5
