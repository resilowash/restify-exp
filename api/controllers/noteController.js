const moment = require('moment');
const Note = require('../lib/note');
const EOL = require('os').EOL;
const restify = require('restify');
const config = require('../config/config.json');
const fs = require('fs');
const httpStatus = require('http-status-codes');

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
server.use(restify.plugins.bodyParser());


server.post('/note', (req, res, next) => {
  console.log('Note Post');
  //console.log('request: ', req);
    //let jsonBody = JSON.parse(req.body);
  //console.log("Title: ", jsonBody.Title );
  console.log('REquest body: ', req.body);
  console.log('Request params: ', req.params);
  res.send(httpStatus.OK);
  return next();
});

server.listen(config.noteController.port, ()=>{
  console.log('Ready on %s', server.url);
});
//console.log("Your Note: %s Title - %s %s Text - %s %s Date - %s", EOL, myNote.title, EOL, myNote.text, EOL, myNote.date );
