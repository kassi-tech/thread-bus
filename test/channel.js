'use strict';

var Thread = require('../index.js');
var expect = require('chai').expect;

describe('Thread', () => {
  describe('channels', () => {
    let channelOptions = {};

    beforeEach((done) => {
      channelOptions = {};
      done();
    });

    afterEach((done) => {
      Thread.disconnect();
      done();
    });

    it('should add "topic" exchange point', (done) => {
      channelOptions = {
        channel: 'test',
        type: 'topic'
      };

      Thread.connect().then((connection) => {
        return Thread.createChannel(channelOptions);
      }).then((channel) => {
        expect(Thread.channels[channelOptions.channel]).to.exist;
        expect(Thread.channels[channelOptions.channel]).to.be.object;
        expect(Thread.channels[channelOptions.channel].state).to.equal('open');
        expect(Thread.channels[channelOptions.channel].name).to.equal(channelOptions.channel);
        done();
      }).catch(done);
    });
  });
});
