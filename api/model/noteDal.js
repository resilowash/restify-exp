const {Client} = require('pg');
const config = require('../config/config.json');


class NoteDal {

    constructor() {
        this.client = new Client({
            user: config.database.user, 
            host: config.database.server,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port
        });
    }

    async createNewNote(note) {
        let querytext = ('INSERT INTO note(guid, subject, notebody, datecreated)VALUES($1, $2, $3, $4)');
        const values = [note.guid, note.title, note.text, note.date];

        try{
          await this.client.connect();
          const resp =  await this.client.query(querytext, values);
          await this.client.end();
          return resp;
        }
        catch(e){
          console.log('Failed in db', e);
        }
    }

    async getAllNotes() {
        let queryText = 'SELECT * FROM note';
        try {
            await this.client.connect();
            let resp = await this.client.query(queryText);
            await this.client.end();
            return resp;
        }
        catch(e) {
            console.log('Failed in db', e);
        }
    }
}

module.exports = NoteDal;