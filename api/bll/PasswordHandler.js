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

module.exports.getSalt = async function getSalt() {
    return bcrypt.genSaltSync(10);
}

/// take the given password, grab the user's salt, hash both, compare to database, if good issue token if not return null
/// @param {String} password plain text password entered by user 
/// @param {String} username the username for the user that is logging in
/// @return {String} token or null 
module.exports.authenticate = async function authenticate(username, password) {

    try {
        let userdal = new UserDAL();
        let salt = userdal.getUserSalt(username);
        console.log("USER Salt for %s is %s", username, salt);
    }
    catch (e) {
        console.log("ISSUE IN AUTHENTICATE: ", e);
    }
}