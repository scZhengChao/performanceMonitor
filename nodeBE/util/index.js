
//  应用日志和 服务日志
let logger = require('../logger')
let morgan4acc = require('../logger/morgan4acc')
// 规范返回数据格式
function responseClient(res, info={}, httpCode = 200, code = "000000", message = 'success') {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = info; 
    res.status(httpCode).json(responseData);
}

module.exports = {
    responseClient,logger,morgan4acc
}