const {Client} = require('pg');
const config = require('../config/config.json');

class BaseDAL {
  constructor() {
    this.client = new Client({
        user: config.database.user,
        host: config.database.server,
        database: config.database.database,
        password: config.database.password,
        port: config.database.port
    });
  }
}

module.exports = BaseDAL;
