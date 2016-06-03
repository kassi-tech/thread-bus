'use strict';

/**
 * Destroy channel (exchange point)
 * @param {string} options.channel  -  channel name (exchange)
 */
module.exports = function (options) {
    this.channels[options.channel].destroy();
};
