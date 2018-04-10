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


server.post('/note', async(req, res, next) => {
  console.log('Note Post');
  let note = createNote(req.body.title, req.body.text, null);

  try {
      //cannot reuse a client... so putting this here which is annoying because it loads config every time
      let notedal = new NoteDAL();
      let resp = await notedal.createNewNote(note);

      if(resp != null) {
          //should always be one for this
          console.log('Rows modified: ', resp.rowCount);

          if (resp.rowCount != 1) {
              res.send(httpStatus.INTERNAL_SERVER_ERROR);
          }
          else {
              console.log("Note Created: ", note);
              res.send(httpStatus.OK);
          }
      }
      else {
          res.send(httpStatus.INTERNAL_SERVER_ERROR);
      }
      return next();
  }
  catch(e) {
      console.log('an error has occured: ', e);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
  }
});

server.get('/note', async(req, res, next) => {
    console.log('Get All Notes Request');
    try {
        let notedal = new NoteDAL();
        let resp = await notedal.getAllNotes();
        if(resp != null) {
            res.send(httpStatus.OK, resp.rows);
        }
        else {
            res.send(httpStatus.INTERNAL_SERVER_ERROR);
        }
        return next();

    }
    catch(e) {
        console.log('An Error has occured: ', e);
        res.send(httpStatus.INTERNAL_SERVER_ERROR);
    }
});


server.listen(config.noteController.port, ()=>{
  console.log('Ready on %s', server.url);
});
//console.log("Your Note: %s Title - %s %s Text - %s %s Date - %s", EOL, myNote.title, EOL, myNote.text, EOL, myNote.date );
