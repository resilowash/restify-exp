class Note {
  constructor(guid, title, text, date) {
    this.guid = guid; 
    this.title = title;
    this.text = text;
    this.date = date;
  }
}

module.exports = Note;
//the below line doesn't work
//module.exports.Note = Note;
