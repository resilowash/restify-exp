const {Client} = require('pg');
const config = require('../config/config.json');


class NoteDAL {
    NoteDal() {
        const client = new Client({
            user: config.database.user, 
            host: config.database.server,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port
        });
    }

    connect() {
        try {
            await client.connect(); 
            return client; 
        }
        catch(e) {
            console.log("Error Connecting: ", e);
        }
    }

    createNewNote(note) {
        let querytext = ('INSERT INTO note(guid, subject, notebody, datecreated)VALUES($1, $2, $3, $4)');
        values = [note.guid, note.title, note.text, note.date];

        try{
          const resp =  await client.query(text, values); 
        }
    }

}