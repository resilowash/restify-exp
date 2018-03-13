class Note {
  constructor(title, text, date) {
    this.title = title;
    this.text = text;
    this.date = date;
  }
}

module.exports = Note;
//the below line doesn't work
//module.exports.Note = Note;
