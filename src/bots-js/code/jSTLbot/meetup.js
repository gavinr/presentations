// const request = require('request');
const rp = require('request-promise-native');

const apiUrl = 'http://api.meetup.com';

module.exports = class Meetup {
  constructor(urlname) {
    this.urlname = urlname;
  }

  events() {
    return rp({
      uri: `${apiUrl}/${this.urlname}/events`,
      json: true,
    });
  }
};
