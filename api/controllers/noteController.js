let moment = require('moment');
let Note = require('../lib/note');
let EOL = require('os').EOL;
const restify = require('restify');

console.log("Current Date Time: ", moment().format('MMMM Do YYYY, h:mm:ss a'));

const createNote = (title, text, date) => {
  if(date == null) {
    date = moment().format('MM/DD/YYYY');
    //that does something really weird
    //date = moment().format('mm/dd/yyyy');
  }
  let note = new Note(title, text, date);
  return note;
}

//let myNote = createNote('Test', 'This is text', null );

let server = restify.createServer();
server.listen()

console.log("Your Note: %s Title - %s %s Text - %s %s Date - %s", EOL, myNote.title, EOL, myNote.text, EOL, myNote.date );
