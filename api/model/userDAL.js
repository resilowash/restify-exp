const BaseDAL = require('./BaseDAL.js');

class UserDAL extends BaseDAL {
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
      console.log('Failed in db', e);
    }
  }

}
