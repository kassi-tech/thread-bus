'use strict';

/**
 * Destroy channel (exchange point)
 * @param {string} channel  -  channel name (exchange)
 */
module.exports = function (channel) {
    this.channels[channel].destroy(false);
    this.channels[channel] = null;

    return {
      status: 'destroyed',
      channel: channel
    };
};
