/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable max-len */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;


describe('Main', () => {
  const jStlBot = require('../jStlBot');

  it('should respond correctly to a question about the organizer.', () => expect(jStlBot.getResponse('Who is the organizer?')).to.equal('Chris S'));
  it('should respond correctly to a question about the next meeting.', () => expect(jStlBot.getResponse('When is the next meeting?')).to.eventually.have.string('The next event is'));
  it('should respond correctly to a question about the team trello.', () => expect(jStlBot.getResponse('Where can I propose a talk?')).to.equal('Check out our trello planning board at https://trello.com/b/Z5D7k2yJ/jstl'));
  it('should respond correctly to a question about the homepage.', () => expect(jStlBot.getResponse('What is the homepage?')).to.equal('Check out our website at meetup.com/jstl-meetup'));
  it('should respond correctly to a nonsese question.', () => expect(jStlBot.getResponse('sdfsfsdf?')).to.equal('Sorry, we could not follow your question. Please ask in a different way.'));
});
