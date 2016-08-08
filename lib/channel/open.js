'use strict';

/**
 * Add exchange point
 * @param {String} options.channel - channel name (exchange)
 * @return {{ status: String, channel: String }} - channel status
 *  and name
 */
module.exports = function (options) {
  let _self = this;
  let channel = _self.connection.exchange(options.channel, { type: 'topic' });

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
