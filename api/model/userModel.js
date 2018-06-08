
class UserModel {
  constructor(guid, email, username, password, passwordSalt, dateTimeCreated) {
    this.guid = guid;
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordSalt = passwordSalt;
    this.dateTimeCreated = dateTimeCreated;
  }
}

module.exports = UserModel;
