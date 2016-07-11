'use strict';

var amqp = require('amqp');
var _assignIn = require('lodash').assignIn;

/**
 * @param {string} options.host  -  AMQP server host
 * @param {integer} options.port  -  AMQP server port
 */
module.exports = function (options) {
  let _self = this;
  _self.options.client = _assignIn(_self._options.client, options);
  let connection = amqp.createConnection(_self.options.client);

  return new Promise((resolve, reject) => {
    connection.on('ready', () => {
      _self.connection = connection;
      resolve(connection);
    });

    /** Handling ECONNREFUSED, etc.. */
    connection.on('error', (error) => {
      reject(error);
    });
  });
};
