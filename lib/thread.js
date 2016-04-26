'use strict';

/**
 * Thread
 * @param {string} options.host  -  AMQP server host
 * @param {integer} options.port  -  AMQP server port
 */
function Thread () {
  this.connection = null;
  this.options = null;
}

/** Default options  */
Thread.prototype._options = {
  host: 'localhost',
  port: 5672
};

/** Client methods */
Thread.prototype.connect = require('./client/connect.js');
Thread.prototype.disconnect = require('./client/disconnect.js');

/** Exchanges */
Thread.prototype.createChannel = require('./channel/create.js');

module.exports = Thread;
