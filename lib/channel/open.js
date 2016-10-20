'use strict';

const ERROR_CHANNEL_ALREADY_OPENED = new Error('Channel is already opened.');

/**
 * Add exchange point
 * @param {String} options.channel - channel name (exchange)
 * @return {{ status: String, channel: String }} - channel status and name
 */
module.exports = function (options) {
  let _self = this;

  return new Promise((resolve, reject) => {
    if (_self.channels[options.channel]) reject(ERROR_CHANNEL_ALREADY_OPENED);

    let channel = _self.connection.exchange(options.channel, { type: 'topic' });

    channel.on('open', () => {
      _self.channels[options.channel] = channel;

      resolve({
        status: 'open',
        channel: options.channel
      });
    });
  });
};
