'use strict';

/**
 * Thread
 */
function Thread () {
  this.connection = null;
  this.options = {};
  this.channels = {};
}

/**
 * Default options
 * TODO: Provide SSL parameters
 */
Thread.prototype._options = {};
Thread.prototype._options.client = {
  host: 'localhost',
  port: 5672,
  login: 'guest',
  password: 'guest',
  connectionTimeout: 10000,
  vhost: '/',
  noDelay: true,
  ssl: {
    enabled: false
  }
};

/** Client methods */
Thread.prototype.connect = require('./client/connect.js');
Thread.prototype.disconnect = require('./client/disconnect.js');

/** Channels (exchanges) */
Thread.prototype.open = require('./channel/open.js');
Thread.prototype.close = require('./channel/close.js');
Thread.prototype.listen = require('./channel/listen.js');

module.exports = new Thread();
