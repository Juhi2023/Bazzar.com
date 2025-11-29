var debugging_enabled = true;

/*
*-------------------
* START SECTION
*-------------------
*/

exports.startSection = function (section) {
    if(debugging_enabled) {
        console.log("=========== " +section + " ===========");
    }
};


/*
*-------------------
* LOG REQUEST PARAMS
*-------------------
*/
exports.logRequest =  function(request) {
    if(debugging_enabled) {
        console.log("REQUEST: " + JSON.stringify(request.body));
    }
};

exports.logGetRequest =  function(request) {
    if(debugging_enabled) {
        console.log("REQUEST: " + JSON.stringify(request.query));
    }
};


/*
*-------------------
* LOG RESPONSE
*-------------------
*/

exports.logResponse = function (response) {
    if(debugging_enabled) {
        console.log("RESPONSE: " + JSON.stringify(response,undefined,2));
    }
};