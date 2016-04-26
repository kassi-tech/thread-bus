'use strict';

var amqp = require('amqp');
var _assignIn = require('lodash').assignIn;

module.exports = function (options) {
  this.options = _assignIn(this._options, options)
  this.connection = amqp.createConnection(this.options);
};
