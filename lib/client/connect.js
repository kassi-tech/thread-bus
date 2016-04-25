'use strict';

var amqp = require('amqp');

module.exports = function (options) {
  this.connection = amqp.createConnection(this.options);
};
