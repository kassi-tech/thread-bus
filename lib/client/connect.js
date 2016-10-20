'use strict';

const amqp = require('amqp');
const _assignIn = require('lodash').assignIn;

const ERROR_CLIENT_ALREADY_EXIST = new Error('Connection already established.');

/**
 * Establish connection to RabbitMQ server
 * @param {String} options.host - RabbitMQ server host
 * @param {Integer} options.port - RabbitMQ server port
 * @param {String} options.login - login
 * @param {String} options.password - password
 */
module.exports = function (options) {
  let _self = this;

  return new Promise((resolve, reject) => {
    if (_self.connection) reject(ERROR_CLIENT_ALREADY_EXIST);

    _self.options.client = _assignIn(_self._options.client, options); // assign options

    let connection = amqp.createConnection(_self.options.client);

    _self.options.client.uri = `amqp://` +
       `${_self.options.client.login}:` +
       `${_self.options.client.password}@` +
       `${_self.options.client.host}:` +
       `${_self.options.client.port}`;

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
