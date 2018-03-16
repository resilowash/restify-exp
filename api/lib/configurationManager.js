const config = require('../config/config.json');

//console.log(config.noteController.url);
//BONUS: YOU ACTUALLY DON'T NEED THIS AT ALL! YOU CAN JUST LOAD THE JSON CONFIGURATION FILE WHEREVER YOU WANT!

const getConfigValue = function(key) {
    //let user check for null
    ///handling multiple nested splits
    settings = key.split('.')
    return config[key];
}

console.log(getConfigValue("noteController"));
/*
the below isn't needed since it's already a json object
try {
    let config = JSON.parse(configJson);
    console.log(config.noteController.url);
}
catch(e) {
    console.log('error: ', e);
}
*/
