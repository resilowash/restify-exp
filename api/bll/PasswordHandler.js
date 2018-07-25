/**
 * This is basically a FACADE pattern style of abstracting away the data layer and allowing business logic to be handled in a new layer instead
 * of the controller or data access layer handling it.  
 * 
 * Author: R. Silowash 
 * Date: July 2018 
**/
const bcrypt = require('bcrypt');
const UserDAL = require('../model/UserDAL');

/// hash the password using bcrypt hashsync
/// @param {String} textSalt base64 encoded text salt string to use in hashing the password 
/// @param {String} textPassword clear text password that will be hashed with the salt. 
/// @return {String} password hashed password
module.exports.hashPassword = async function hashPassword(textSalt, textPassword) {
    console.log("Call to hashpassword salt: %s password: %s", textSalt, textPassword);

    let password = bcrypt.hashSync(textPassword, textSalt);
    return password;
}

/// generates the salt using bcrypt 
/// @return {String} bcrypt salt string 
module.exports.getSalt = async function getSalt() {
    return bcrypt.genSaltSync(10);
}

/// take the given password, grab the user's salt, hash both, compare to database, if good issue token if not return null
/// @param {String} username the username for the user that is logging in
/// @param {String} password plain text password entered by user 
/// @return {String} token or null 
module.exports.authenticate = async (username, password) => {

    try {
        console.log('Params in authenticate username: %s password: %s', username, password);
        let userdal = new UserDAL();
        let salt = await this.getSaltForUser(username);
        console.log("USER Salt for %s is %s", username, salt);
        let hashedPass = await this.hashPassword(salt, password);
        //let userPass = await this.getPasswordForUser(username);
        let match = bcrypt.compareSync(password, hashedPass);
        console.log("Authentication match: ", match);

    }
    catch (e) {
        console.log("ISSUE IN AUTHENTICATE: ", e);
    }
}

/// Take the given username and get the user's salt 
/// @param {String} username is the username to get salt from db for
/// @return {String} pwsalt fpassword salt stored in data storage 
module.exports.getSaltForUser = async function getSaltForUser(username) {
    let userdal = new UserDAL();
    //should only ever return one record  
    let rows = await userdal.getUserSalt(username);
    let pwsalt = rows[0].pwsalt;
    console.log("Password SALT -> getSaltForUser : ", pwsalt);
    return pwsalt;
}

module.exports.getPasswordForUser = async function getPasswordForUser(username) {
    let userdal = new UserDAL();
    let rows = await userdal.getUserPassword(username);
    let password = rows[0].password;
    //security risk logging on server side password AHHHHH
    console.log("user password is: ", password);

    return password;
}