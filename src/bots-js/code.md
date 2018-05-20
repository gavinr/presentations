# Code

## Prep

https://www.claudiajs.com/tutorials/installing.html


1. Remove old lambda functions and api gateways (jSTL), and IAM roles (`*-executor`)
2. login to slack (https://gavinr.slack.com/messages) and remove old slack slash commands
3. Also Remove old slack messages in test channel 
4. Create IAM user named "claudia"
5. `pip install awscli`
6. `aws configure`

## Hello World

```
npm install -g claudia
mkdir test
cd test
npm init
npm install --save claudia-bot-builder
```

code - `bot.js`:

```
var botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(function(message) {
  console.log('got text:', message);
  return `Hello ${message.text}`;
});
```

then run:
```
claudia create --region us-east-1 --api-module bot
claudia update --configure-slack-slash-command
```

then go to:

- https://my.slack.com/services/new/slash-commands

## jSTL Bot

- copy completed `bot.js`
- 
- create basic `jStlBot.js`:
  ```
  function getResponse(text) {
    text = text.toLowerCase();

    if (text.includes('next meeting') || text.includes('next event')) {
      // return the next meeting details!
      // todo
    } else if (text.includes('organizer')) {
      // return contact details of the organizer
      return 'Chris S';
    } else if (text.includes('trello')) {
      // return the link to the trello
      return 'Check out our trello planning board at https://trello.com/b/Z5D7k2yJ/jstl';
    } else if (text.includes('homepage')) {
      // return a link to the website.
      return 'Check out our website at meetup.com/jstl-meetup';
    }

    // else:
    return 'Sorry, we could not follow your question. Please ask in a different way.';
  }
  exports.getResponse = getResponse;
  ```
- tests!
  - `npm install --save chai chai-as-promised eslint eslint-config-airbnb-base eslint-plugin-import mocha`
  - create `.eslintrc.js`:
    ```
    module.exports = {
      "extends": "airbnb-base",
      "env": {
          "mocha": true
      },
      "rules": {
          "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
          "no-param-reassign": ["warn", { "props": false }],
          "no-underscore-dangle": "off",
          "max-len": "off",
          "linebreak-style": "off"
      }
    };
  ```
  - package.json: `"test": "mocha --timeout 10000"`
  - create `test/test.js`
  ```
  /* eslint-disable import/no-extraneous-dependencies */
  /* eslint-disable global-require */
  /* eslint-disable max-len */

  const chai = require('chai');

  const { expect } = chai;

  describe('Main', () => {
    const jStlBot = require('../jStlBot');

    it('should respond correctly to a question about the organizer.', () => expect(jStlBot.getResponse('Who is the organizer?')).to.equal('Chris S'));
    it('should respond correctly to a question about the team trello.', () => expect(jStlBot.getResponse('Where can I propose a talk?')).to.equal('Check out our trello planning board at https://trello.com/b/Z5D7k2yJ/jstl'));
    it('should respond correctly to a question about the homepage.', () => expect(jStlBot.getResponse('What is the homepage?')).to.equal('Check out our website at meetup.com/jstl-meetup'));
    it('should respond correctly to a nonsese question.', () => expect(jStlBot.getResponse('sdfsfsdf?')).to.equal('Sorry, we could not follow your question. Please ask in a different way.'));
  });
  ```
  - run tests: `npm test`


## Deploy to Twilio

1. https://www.twilio.com/console/

`claudia update --configure-twilio-sms-bot`

2. Then fill in info, and test at google voice, https://voice.google.com/messages

## Debugging

- add console.log() and then run `claudia update` before showing:

https://github.com/jorgebastida/awslogs

`pip install awslogs`

`awslogs get /aws/lambda/1 ALL --watch`

## Advanced queries

- Goal: next meeting
- Copy over `meetup.js`
- `npm install --save chai-as-promised request request-promise-native`
- top of jStlBot.js:

  ```
  const MeetupApi = require('./meetup');
  // yes there is a package for this, but is a lot heavier than we need right now
  const meetupUrlName = 'jstl-meetup';
  const meetup = new MeetupApi(meetupUrlName);
  ```

- middle/todo section:
  ```
  return meetup.events().then((evt) => {
    if (evt && evt.length > 0) {
      let ret = `The next event is called ${evt[0].name} and is on ${evt[0].local_date}`;
      if (evt[0].venue && Object.prototype.hasOwnProperty.call(evt[0].venue, 'name')) {
        ret = `${ret} and will be located at the ${evt[0].venue.name}.`;
      } else {
        // if no location, add the period at the end of sentence.
        ret = `${ret}.`;
      }
      return ret;
    }
    return 'There are no events scheduled.';
  }, err => console.error(err));
  ```
- test.js:

  ```
  const chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);
  ```
  and
  ```
  it('should respond correctly to a question about the next meeting.', () => expect(jStlBot.getResponse('When is the next meeting?')).to.eventually.have.string('The next event is'));
  ```

  - run `claudia update` and then see it work in awslogs