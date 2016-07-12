'use strict';

var Thread = require('../index.js');
var expect = require('chai').expect;

describe('Thread', () => {
  afterEach((done) => {
    Thread.disconnect();
    done();
  });

  describe('client', () => {
    let options = {};

    beforeEach((done) => {
      options = {};
      done();
    });

    it('should connect to AMQP server with default options', (done) => {
      Thread.connect().then((connection) => {
        expect(connection.status).to.equal('open');
        expect(connection.uri).to.equal('amqp://guest:guest@localhost:5672');
        expect(Thread.connection.options.port).to.equal(5672);
        expect(Thread.connection.options.login).to.equal('guest');
        expect(Thread.connection.options.password).to.equal('guest');
        expect(Thread.connection.options.connectionTimeout).to.equal(10000);
        expect(Thread.connection.options.ssl.enabled).to.equal(false);
        done();
      }).catch(done);
    });

    it('should connect to AMQP server with specified options', (done) => {
      options.host = '127.0.0.1';
      options.port = 5672;
      options.connectionTimeout = 100;

      Thread.connect(options).then((connection) => {
        expect(connection.status).to.equal('open');
        expect(connection.uri).to.equal('amqp://guest:guest@127.0.0.1:5672');
        expect(Thread.connection.options.host).to.equal('127.0.0.1');
        expect(Thread.connection.options.port).to.equal(5672);
        expect(Thread.connection.options.login).to.equal('guest');
        expect(Thread.connection.options.password).to.equal('guest');
        expect(Thread.connection.options.connectionTimeout).to.equal(100);
        expect(Thread.connection.options.ssl.enabled).to.equal(false);
        done();
      }).catch(done);
    });
  });
});
