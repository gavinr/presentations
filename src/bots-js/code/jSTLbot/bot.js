const botBuilder = require('claudia-bot-builder');
const jStlBot = require('./jStlBot');

module.exports = botBuilder(message => jStlBot.getResponse(message.text));
