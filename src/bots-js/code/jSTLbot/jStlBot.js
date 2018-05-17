const MeetupApi = require('./meetup');
// yes there is a package for this, but is a lot heavier than we need right now
const meetupUrlName = 'jstl-meetup';
const meetup = new MeetupApi(meetupUrlName);

function getResponse(text) {
  text = text.toLowerCase();

  if (text.includes('next meeting') || text.includes('next event')) {
    // return the next meeting details!
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
  } else if (text.includes('organizer')) {
    // return contact details of the organizer
    return 'Chris S';
  } else if (text.includes('trello') || text.includes('proposals') || text.includes('propose')) {
    // return the link to the trello
    return 'Check out our trello planning board at https://trello.com/b/Z5D7k2yJ/jstl';
  } else if (text.includes('homepage') || text.includes('website')) {
    // return a link to the website.
    return 'Check out our website at meetup.com/jstl-meetup';
  }
  return 'Sorry, we could not follow your question. Please ask in a different way.';
}
exports.getResponse = getResponse;
