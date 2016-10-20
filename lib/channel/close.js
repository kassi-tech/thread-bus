'use strict';

const CHANNEL_UNAVAILABILITY_ERROR = new Error('Specified channel doesn\'t exist');

/**
 * Destroy channel (exchange point)
 * @param {String} channel - channel name (exchange)
 */
module.exports = function (channel) {
  let _self = this;

  return new Promise((resolve, reject) => {
    if (!_self.channels[channel]) reject(CHANNEL_UNAVAILABILITY_ERROR);

    _self.channels[channel].destroy(false);
    _self.channels[channel] = null;

    resolve({
      status: 'destroyed',
      channel: channel
    });
  });
};
