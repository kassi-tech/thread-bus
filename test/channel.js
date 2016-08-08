'use strict';

var Thread = require('../index.js');
var expect = require('chai').expect;
var simple = require('simple-mock');

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

    it('should create exchange point', (done) => {
      channelOptions = {
        channel: 'test'
      };

      Thread.connect().then(() => {
        return Thread.open(channelOptions);
      }).then((result) => {
        expect(result.status).to.equal('open');
        expect(result.channel).to.equal(channelOptions.channel);
        expect(Thread.channels[channelOptions.channel]).to.exist;
        expect(Thread.channels[channelOptions.channel]).to.be.object;
        expect(Thread.channels[channelOptions.channel].state).to.equal('open');
        expect(Thread.channels[channelOptions.channel].name).to.equal(channelOptions.channel);
        done();
      }).catch(done);
    });

    it('should destroy exchange point', (done) => {
      channelOptions = {
        channel: 'test'
      };

      Thread.connect().then(() => {
        return Thread.open(channelOptions);
      }).then(() => {
        return Thread.close(channelOptions.channel);
      }).then((result) => {
        expect(result.status).to.equal('destroyed');
        expect(result.channel).to.equal(channelOptions.channel);
        expect(Thread.channels[channelOptions.channel]).to.equal(null);
        done();
      }).catch(done);
    });

    it('should not destroy exchange point', (done) => {
      let errorMessage = new Error('Specified channel doesn\'t exist');

      Thread.connect().then(() => {
        return Thread.close('test');
      }).then(done).catch((error) => {
        expect(error).to.deep.equal(errorMessage);
        done();
      });
    });

    it('should listen channel', (done) => {
      let channelOptions = {
        channel: 'test',
        listener: function () { }
      };

      Thread.connect().then(() => {
        return Thread.listen(channelOptions);
      }).then((ans) => {
        expect(ans.status).to.equal('subscribed');
        expect(ans.channel).to.equal(channelOptions.channel);
        done();
      }).catch(done);
    });

    it('should reject listener with error', (done) => {
      let errorMessage = 'Queue doesn\'t exist';
      let channelOptions = {
        channel: 'test',
        listener: function () { }
      };

      Thread.connect().then(() => {
        simple.mock(Thread.connection, 'queue').callbackWith(null);
        return Thread.listen(channelOptions);
      }).then(done).catch((error) => {
        expect(error.message).to.equal(errorMessage);
        done();
      });
    });
  });
});
