'use strict';

var _ = require('lodash');

exports.formRequest = formRequest;
exports.formResponse = formResponse;

function formRequest (message) {
  let agent = _.omit(_.pick(message, ['agent']), 'handlers');
  let body = _.omit(message, ['agent']);

  body.data = body.data.toString('utf-8');

  return {
    agent,
    body
  };
}

function formResponse (message) {
  let handlers = _.pick(message, ['agent']);

  return {

  }
}
