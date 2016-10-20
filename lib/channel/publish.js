'use strict';

const ERROR_CHANNEL_NOT_EXIST = new Error('Channel does not exist.');

/**
 * Publish message to the channel
 * @param {String} options.channel - channel name
 * @param {String} options.body - message body (JSON)
 */
module.exports = function (options, cb) {
  let _self = this;

  return new Promise((resolve, reject) => {
    let channel = _self.channels[options.channel];
    if (!channel) reject(ERROR_CHANNEL_NOT_EXIST);

    _self.connection.publish(options);

    resolve({
      status: 'published'
    });
  });
};
