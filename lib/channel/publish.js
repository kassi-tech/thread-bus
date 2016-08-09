'use strict';

/**
 * Publish message to the channel
 * @param {String} options.channel - channel name
 * @param {String} options.body - message body (JSON)
 */
module.exports = function (options, cb) {
  let _self = this;
  let channel = _self.channels[options.channel];
  if (!channel) throw new Error
};
