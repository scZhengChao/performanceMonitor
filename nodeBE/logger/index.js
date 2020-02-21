const log4js = require("./log4js");
const errorLog = log4js.getLogger("error"); //此处使用categories的值
const infoLog = log4js.getLogger("default"); //此处使用categories的值
let log = {};
log.info = function(infos) {
    infoLog.info(infos)
};
log.error = function(infos,) {
    errorLog.error(infos);
};

module.exports = log;