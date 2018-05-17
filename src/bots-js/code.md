# Code

## Prep

https://www.claudiajs.com/tutorials/installing.html

1. Remove old lambda functions and api gateways (jSTL)
2. Create IAM user named "claudia"
3. `pip install awscli`
4. `aws configure`

## Hello World

code:
```
var botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(function(message) {
  console.log('got text:', message);
  return `Hello ${message.text}`;
});
```

then run:
```
npm install -g claudia
npm install --save claudia-bot-builder
claudia create --region us-east-1 --api-module bot
claudia update --configure-slack-slash-command
```

then go to:

- https://my.slack.com/services/new/slash-commands

## jSTL Bot

todo

## Deploy to Twilio

1. https://www.twilio.com/console/

`claudia update --configure-twilio-sms-bot`

## Debugging

https://github.com/jorgebastida/awslogs

`pip install awslogs`

`awslogs get /aws/lambda/1 ALL --watch`