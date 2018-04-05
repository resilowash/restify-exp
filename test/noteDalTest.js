const NoteDAL = require('../api/model/noteDal');

async function testNoteDALConnect() {
    let notedal = new NoteDAL();

    try {
        await notedal.client.connect();
        let result = await notedal.client.query('SELECT NOW()');
        console.log("Result: ", result.rows);
        await notedal.client.end();
    }
    catch (e) {
        console.log(e);
    }
}

testNoteDALConnect();