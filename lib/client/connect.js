'use strict';

var amqp = require('amqp');
var _assignIn = require('lodash').assignIn;

/**
 * @param {String} options.host - AMQP server host
 * @param {Integer} options.port - AMQP server port
 * @param {String} options.login - login
 * @param {String} options.password - password
 * @param {String} options.host - AMQP 
 */
module.exports = function (options) {
  let _self = this;
  _self.options.client = _assignIn(_self._options.client, options);
  let connection = amqp.createConnection(_self.options.client);
  _self.options.client.uri = `amqp://` +
     `${_self.options.client.login}:` +
     `${_self.options.client.password}@` +
     `${_self.options.client.host}:` +
     `${_self.options.client.port}`;

  return new Promise((resolve, reject) => {
    connection.on('ready', () => {
      _self.connection = connection;

      resolve({
        status: 'open',
        uri: _self.options.client.uri
      });
    });

    /** Handling ECONNREFUSED, etc.. */
    connection.on('error', (error) => {
      reject(error);
    });
  });
};
