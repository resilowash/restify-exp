const moment = require('moment');
const Note = require('../lib/note');
const EOL = require('os').EOL;
const restify = require('restify');
const config = require('../config/config.json'); 

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

let server = restify.createServer();

server.post('/note', respond);

console.log("Your Note: %s Title - %s %s Text - %s %s Date - %s", EOL, myNote.title, EOL, myNote.text, EOL, myNote.date );
