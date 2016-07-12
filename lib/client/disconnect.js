'use strict';

module.exports = function () {
  this.connection.disconnect();

  return {
    status: 'closed',
    uri: this.options.client.uri
  };
};
