# Code

## Prep

https://www.claudiajs.com/tutorials/installing.html

1. Remove old lambda functions and api gateways (jSTL)
2. Create IAM user named "claudia"
3. Create `config` file in `<user account>/.aws`:
  ```
  [default]
    region=us-east-1
    output=json
  ```
3. Create `credentials` file in `<user account>/.aws`:
  ```
  [default]
    aws_access_key_id = XYZ
    aws_secret_access_key = XYZ
  ```
4. run:
  ```
  Set AWS_PROFILE=claudia
  ```

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
npm install claudia-bot-builder
claudia create --region us-east-1 --api-module bot
claudia update --configure-slack-slash-command
```

then go to:

- https://my.slack.com/services/new/slash-commands