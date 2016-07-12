'use strict';

const CHANNEL_UNAVAILABILITY_ERROR = new Error('Specified channel doesn\'t exist');

/**
 * Destroy channel (exchange point)
 * @param {string} channel  -  channel name (exchange)
 */
module.exports = function (channel) {
  return new Promise((resolve, reject) => {
    if (!this.channels[channel]) return reject(CHANNEL_UNAVAILABILITY_ERROR);

    this.channels[channel].destroy(false);
    this.channels[channel] = null;

    resolve({
      status: 'destroyed',
      channel: channel
    });
  });
};
