'use strict';

/**
 * Thread
 */
function Thread () {
  this.connection = null;
  this.options = {};
  this.channels = {};
}

/** Default options  */
Thread.prototype._options = {};
Thread.prototype._options.client = {
  host: 'localhost',
  port: 5672
};

/** Client methods */
Thread.prototype.connect = require('./client/connect.js');
Thread.prototype.disconnect = require('./client/disconnect.js');

/** Channels (exchanges) */
Thread.prototype.createChannel = require('./channel/create.js');
Thread.prototype.destroyChannel = require('./channel/destroy.js');

module.exports = Thread;
