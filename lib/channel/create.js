'use strict';

/**
 * Add exchange point
 * @param {string} options.channel  -  channel name (exchange)
 * @param {string} options.type  -  exchange type (fanout/direct/topic)
 */
module.exports = function (options) {
  let _self = this;
  let channel = _self.connection.exchange(options.channel, { type: options.type });

  return new Promise((resolve, reject) => {
    channel.on('open', () => {
      _self.channels[options.channel] = channel;

      resolve({
        status: 'open',
        channel: options.channel
      });
    });
  });
};
