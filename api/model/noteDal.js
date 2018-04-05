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

    async connect() {
        try {
            console.log("this client: ", this.client);
            await this.client.connect();
        }
        catch(e) {
            console.log("Error Connecting:  %s %s", this.client, e);
        }
    }

    async createNewNote(note) {
        let querytext = ('INSERT INTO note(guid, subject, notebody, datecreated)VALUES($1, $2, $3, $4)');
        const values = [note.guid, note.title, note.text, note.date];

        try{
          let client =  this.connect();
          const resp =  await client.query(querytext, values);
          return resp;
        }
        catch(e){
          console.log(e);
        }
    }
}

module.exports = NoteDal;