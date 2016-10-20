'use strict';

const handlers = require('../utils').handlers;
const ERROR_CHANNEL_NOT_EXIST = new Error('Queue doesn\'t exist');

/**
 * Add exchange point
 * @param {String} options.channel - channel name (exchange).
 * @param {Function} options.listener - channel listener.
 * @return {{ status: String, channel: String }} - listener status and channel name.
 */
module.exports = function (options) {
  let _self = this;

  return new Promise((resolve, reject) => {
    _self.connection.queue(options.channel, function (queue) {
      if (!queue) return reject(ERROR_CHANNEL_NOT_EXIST);

      queue.subscribe((message, headers, deliveryInfo, messageObject) => {
        console.log(message, headers, deliveryInfo, messageObject);
        let request = handlers.formRequest(message);
        let response = handlers.formResponse(message);

        options.listener(request, response);
      });

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
