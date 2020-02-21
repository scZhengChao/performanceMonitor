
let logger = require('../logger')
let morgan4acc = require('../logger/morgan4acc')
function responseClient(res, info={}, httpCode = 200, code = "000000", message = 'success') {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = info; 
    res.status(httpCode).json(responseData);
}
function logAndsendErr(next,err,infos='request error') {  
    logger.error(err,infos)
    next(err)    
}
function checktype(t){
    return Object.prototype.toString.call(t).substring(8).replace("]", "");
}
module.exports = {
    responseClient,logger,morgan4acc,logAndsendErr,checktype
}