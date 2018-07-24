const BaseDAL = require('./BaseDAL.js');

class UserDal extends BaseDAL {
  constructor() {
    super();
  }

  async createNewUser(userModel) {
    let querytext = ('INSERT INTO note_user(guid, email, username, password, pwsalt, datetimecreated)VALUES($1, $2, $3, $4, $5, $6)');
    const values = [userModel.guid, userModel.email, userModel.username, userModel.password, userModel.passwordSalt, userModel.dateTimeCreated];

    try {
      await this.client.connect();
      const resp = await this.client.query(querytext, values);
      await this.client.end();
      return resp;
    }
    catch (e) {
      console.log('Failed to create new user', e);
    }
  }

  async updateUser(userModel) {
    let querytext = ('Update note_user SET email = $1, password = $2, pwsalt = $4 WHERE guid = $3');
    const values = [userModel.email, userModel.password, userModel.guid, userModel.passwordSalt];

    try {
      await this.client.connect();
      const resp = await this.client.query(querytext, values);
      await this.client.end();
      return resp;
    }
    catch (e) {
      console.log('Failed to Update UserModel', e);
    }
  }

  async getUserDetails(id) {
    let querytext = ('SELECT * FROM note_user');
  }

  async getUserSalt(username) {
    let querytext = ('SELECT pwsalt from note_user WHERE username = $1');
    const values = [username];

    try {
      await this.client.connect();
      const resp = await this.client.query(querytext, values);
      console.log('Rows : ', resp.rows);
      await this.client.end();
      return resp.rows;
    }
    catch (e) {
      console.log('Failed to fetch User', e);
      let error = { text: "Failed to Fetch user based on id provided or user has never logged in", stacktrace: e };
      return error;
    }
  }
}

module.exports = UserDal; 
