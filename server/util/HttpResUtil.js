'use strict';
var ERROR_STATUS = 0;
var SUCCESS_STATUS = 1;

function error(errorMsg) {
    return {
        msg: errorMsg,
        status: ERROR_STATUS
    }
}

function success(successMsg) {
    return {
        msg: successMsg,
        status: SUCCESS_STATUS
    }
}

function successWithResult(result) {
    return {
        result: result,
        status: SUCCESS_STATUS
    }
}

function errorWithResult(result) {
    return {
        result: result,
        status: ERROR_STATUS
    }
}

module.exports.error = error;
module.exports.success = success;
module.exports.successWithResult = successWithResult;
module.exports.errorWithResult = errorWithResult;
