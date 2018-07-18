const BaseDAL = require('./BaseDAL.js');

class UserDal extends BaseDAL {
  constructor() {
    super();
  }

  async createNewUser(userModel) {
    let querytext = ('INSERT INTO note_user(guid, email, username, password, pwsalt, datetimecreated)VALUES($1, $2, $3, $4, $5, $6)');
    const values = [userModel.guid, userModel.email, userModel.username, userModel.password, userModel.passwordSalt, userModel.dateTimeCreated];

    try{
      await this.client.connect();
      const resp =  await this.client.query(querytext, values);
      await this.client.end();
      return resp;
    }
    catch(e){
      console.log('Failed to create new user', e);
    }
  }

  async updateUser(userModel) {
    let querytext = ('Update note_user SET email = $1, password = $2 WHERE guid = $3');
    const values = [userModel.email, userModel.password, userModel.guid];

    try{
      await this.client.connect();
      const resp =  await this.client.query(querytext, values);
      await this.client.end();
      return resp;
    }
    catch(e){
      console.log('Failed to Update UserModel', e);
    }
  }

  async getUserDetails(id) {
    let querytext = ('SELECT * FROM note_user');
  }
}

module.exports = UserDal; 
