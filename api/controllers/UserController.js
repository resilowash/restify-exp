const moment = require('moment');
const User = require('../model/userModel.js');
const UserDAL = require('../model/userDal');
const EOL = require('os').EOL;
const restify = require('restify');
const config = require('../config/config.json');
const fs = require('fs');
const httpStatus = require('http-status-codes');
const uuidv4 = require('uuid/v4');

console.log("USER API UP AND RUNNING : Current Date Time: ", moment().format('MMMM Do YYYY, h:mm:ss a'));

let server = restify.createServer();
server.use(restify.plugins.bodyParser());


server.post('api/v' + config.userController.apiVersion + '/user', async(req, res, next) => {
  console.log('User Post');
  let timeCreated = moment().format("MMMM Do YYYY, hh:mm:ss");
  let user = new User(uuidv4(), req.body.email, req.body.username, req.body.password, "mmmmm...salt", timeCreated );

  try {
      //cannot reuse a client... so putting this here which is annoying because it loads config every time
      let userdal = new UserDAL();
      let resp = await userdal.createUser(note);

      if(resp != null) {
          //should always be one for this
          console.log('Rows modified: ', resp.rowCount);

          if (resp.rowCount != 1) {
              res.send(httpStatus.INTERNAL_SERVER_ERROR);
          }
          else {
              res.send(httpStatus.OK);
          }
      }
      else {
          res.send(httpStatus.INTERNAL_SERVER_ERROR);
      }
      return next();
  }
  catch(e) {
      console.log('an error has occured: ', e);
      res.send(httpStatus.INTERNAL_SERVER_ERROR);
  }



});

server.listen(config.userController.port, ()=>{
  console.log('Ready on %s', server.url);
});
