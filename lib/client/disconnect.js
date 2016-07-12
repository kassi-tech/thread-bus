'use strict';

const CLIENT_UNAVAILABILITY_ERROR = new Error('Thread isn\'t connected to AMQP server.');

module.exports = function () {
  return new Promise ((resolve, reject) => {
    if (!this.connection) return reject(new Error (CLIENT_UNAVAILABILITY_ERROR));

    this.connection.disconnect();
    this.connection = null;

    resolve({
      status: 'closed',
      uri: this.options.client.uri
    });
  });
};
