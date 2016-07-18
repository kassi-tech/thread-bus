# thread-bus ![travis](https://travis-ci.org/s-voloshynenko/thread-bus.svg?branch=master) ![npm-version](https://img.shields.io/npm/v/thread-bus.svg)

Thread-bus is an event bus oriented microservice library.

> How it works?

![thread-bus](https://cloud.githubusercontent.com/assets/10322046/16748412/9fea3ada-47cc-11e6-94b7-8c8af336cfff.png)

[WIP]

> Installation

`npm install thread-bus --save`

> Usage

## 1. Connect to the AMPQ server

```js
var Thread = require('thread-bus');

/**
 * Specifying options for AMQP server
 * Note: without options - Thread will use default predefined options (described below).
 */
const options = {
  host: '127.0.0.1',
  port: 5672
};

Thread.connect(options).then(() => {
  // Thread is connected to the AMQP server now.
}).catch(errorHandler);

```

## 2. Open an exchange channel and publish a message

```js
const channelOptions = {
  channel: 'test' // channel name
  durable: true // durable channels remain active after server restart, default - false
};

Thread.open(channelOptions).then(() => {
  /**
   * Channel with 'test' name is available now.
   * Basically, per one microservice (application) you need to open channel only once.
   */
  return Thread.publish({ channel: 'test', message: 'Hello there' }); // We should provide a channel name, because we have a possibility open channels as much as we wish.
}).then(successHandler).catch(errorHandler); // We have a possibility to get response from published channel.
```
As you can see, `open` method will create our Producer, which will share specified message with the help of `publish` method.

## 3. Listen an exchange channel

```js
Thread.listen('test', function (req, res) {
  console.log(req.message); // "Hello there"
  res.send('Hi ;)'); // you can send a response to the Producer
});
```

> Advanced usage

## Producer

As was described above, let's imagine that we need to deliver some info for all market's customers. (Holiday's sales, etc. :)). For example we have 2 markets: UK and UA. So, how to share desirable sales? - Just to publish a message to '#:customers' channel. Let's have a look:

```js
// ./index.js
var Thread = require('thread-bus');
var express = require('express');
var app = exports;

const config = require('./config.json').thread;
const PORT = process.env.NODE_PORT || 8080;
const HOST = process.env.NODE_IP || 'localhost'

app.init = function (cb) {
  app.server = express();

  // connect to db, etc.
  // ...................

  Thread.connect(config).then(() => {
    cb();
  }).catch(cb);
};

app.init((error) => {
  if (error) throw error;

  app.server.post('/customers', require('./services/customers'));
  app.server.listen(PORT, HOST);

  console.log(`Microservice for ALL CUSTOMERS has started.`);
});

// ./services/customers.js
var Thread = require('thread-bus');
const channel = '#:customers';

Thread.open({ channel: channel });

module.exports = function (req, res) {
  Thread.publish({
    channel: channel,
    message: req.body.message
  });
};
```

## Consumers

```js
// UK market service
var Thread = require('thread-bus');
var app = exports;

app.init = function (cb) {
  Thread.connect().then(() => {
    cb();
  }).catch(cb);
};

app.init((error) => {
  if (error) throw error;

  Thread.listen('uk:customers', require('./customers'));
});

// UK market ./customers.js
var mailer = require('./mailer.js');

module.exports = function (req, res) {
  mailer.sendToAllCustomers({
    message: req.message
  }, (error) => {
    if (error) return res.throw(error);

    res.send({ status: 200, message: 'Messages were sended' });
  });
};
```

Also the same thing should be done for UA market.
