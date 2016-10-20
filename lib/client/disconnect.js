'use strict';

const ERROR_CLIENT_UNAVAILABILITY = new Error('Thread isn\'t connected to RabbitMQ server.');

/**
 * Disconnect from RabbitMQ server
 * @returns {Object} Status and RabbitMQ server URI
 */
module.exports = function () {
  let _self = this;

  return new Promise ((resolve, reject) => {
    if (!_self.connection) reject(new Error (ERROR_CLIENT_UNAVAILABILITY));

    _self.connection.disconnect();
    _self.connection = null;
    _self.channels = []; // empty all connections

    resolve({
      status: 'closed',
      uri: _self.options.client.uri
    });
  });
};
