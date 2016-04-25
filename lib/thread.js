'use strict';

var _assignIn = require('lodash').assignIn;

/**
 * Thread
 * @param {string} options.host  -  AMQP server host
 * @param {integer} options.port  -  AMQP server port
 */
function Thread (options) {
  this.connection = null;
  this.options = _assignIn(this._options, options);
}

/** Default options  */
Thread.prototype._options = {
  host: 'localhost',
  port: 5672
};

/** Client methods */
Thread.prototype.connect = require('./client/connect.js');
Thread.prototype.disconnect = require('./client/disconnect.js');

module.exports = Thread;
