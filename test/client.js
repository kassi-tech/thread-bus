'use strict';

var Thread = require('../index.js');
var expect = require('chai').expect;

describe('Thread', () => {
  describe('client', () => {
    it('should connect to AMQP server with default options', (done) => {
      Thread.connect().then(function (connection) {
        expect(connection.options.host).to.equal('localhost');
        expect(connection.options.port).to.equal(5672);
        expect(connection.options.login).to.equal('guest');
        expect(connection.options.password).to.equal('guest');
        expect(connection.options.connectionTimeout).to.equal(10000);
        expect(connection.options.ssl.enabled).to.equal(false);
        done();
      });
    });
  });
});
