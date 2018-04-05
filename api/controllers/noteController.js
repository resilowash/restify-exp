const moment = require('moment');
const Note = require('../lib/note');
const NoteDAL = require('../model/noteDal');
const EOL = require('os').EOL;
const restify = require('restify');
const config = require('../config/config.json');
const fs = require('fs');
const httpStatus = require('http-status-codes');
const uuidv4 = require('uuid/v4');

console.log("Current Date Time: ", moment().format('MMMM Do YYYY, h:mm:ss a'));

const createNote = (title, text, date) => {
  if(date == null) {
    date = moment().format('MM/DD/YYYY');
    //that does something really weird
    //date = moment().format('mm/dd/yyyy');
  }
  let note = new Note(uuidv4(), title, text, date);
  return note;
}

let server = restify.createServer();
server.use(restify.plugins.bodyParser());

let notedal = new NoteDAL();



server.post('/note', (req, res, next) => {
  console.log('Note Post');
  let note = createNote(req.body.title, req.body.text, null);
  console.log("Note Created: ", note);

  //I don't necessarily like having the connect here
  notedal.connect();

  let resp = notedal.createNewNote(note);

  res.send(httpStatus.OK);
  return next();
});

server.listen(config.noteController.port, ()=>{
  console.log('Ready on %s', server.url);
});
//console.log("Your Note: %s Title - %s %s Text - %s %s Date - %s", EOL, myNote.title, EOL, myNote.text, EOL, myNote.date );
