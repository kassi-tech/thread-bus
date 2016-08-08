'use strict';

/**
 * Add exchange point
 * @param {String} options.channel - channel name (exchange).
 * @param {Function} options.listener - channel listener.
 * @return {{ status: String, channel: String }} - listener status
 *  and channel name.
 */
module.exports = function (options) {
  let _self = this;

  return new Promise((resolve, reject) => {
    _self.connection.queue(options.channel, function (queue) {
      if (!queue) return reject(new Error('Queue doesn\'t exist'));

      queue.subscribe(options.listener);
      resolve({
        status: 'subscribed',
        channel: options.channel
      });
    });
  });
};

/**
 * [EXAMPLE]
 * Listener struct
 * @param message - topic's message
 * @param headers - topic's headers
 * @param deliveryInfo - delivery info
 * @param messageObject - can be used for acknowledge a given message
 */

/*
function listener (message, headers, deliveryInfo, messageObject) {
  // use true if you want to acknowledge all previous messages of the queue
  messageObject.acknowledge(false);
}
*/
