const BaseDAL = require('./BaseDAL.js');

class NoteDal extends BaseDAL {

    constructor() {
        super();
    }

    async createNewNote(note) {
        let querytext = ('INSERT INTO note(guid, subject, notebody, datecreated)VALUES($1, $2, $3, $4)');
        const values = [note.guid, note.title, note.text, note.date];

        try {
            await this.client.connect();
            const resp = await this.client.query(querytext, values);
            await this.client.end();
            return resp;
        }
        catch (e) {
            console.log('Failed in db', e);
        }
    }

    async updateNote(note) {
        let querytext = ('UPDATE note SET subject = $1, notebody = $2 WHERE guid = $3');
        const values = [note.title, note.text, note.guid];

        try {
            await this.client.connect();
            const resp = await this.client.query(querytext, values);
            await this.client.end();
            return resp;
        }
        catch (e) {
            console.log('Failed in db', e);
        }
    }

    async getNoteDetails(id) {
        let querytext = 'SELECT * FROM note WHERE id = $1';
        const values = [id];


    }
    async getAllNotes() {
        let queryText = 'SELECT * FROM note';
        try {
            await this.client.connect();
            let resp = await this.client.query(queryText);
            await this.client.end();
            return resp;
        }
        catch (e) {
            console.log('Failed in db', e);
        }
    }
}

module.exports = NoteDal;
