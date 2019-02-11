var botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(function(message) {
  console.log('got text:', message);
  return `Hello ${message.text}`;
});