const log4js = require("log4js");
const config = require('../config')
const infoFilename = config.appInfoLogOutputPath;
const errorFilename = config.appErrorLogOutputPath;

log4js.configure({
  appenders: {
    error: {
      type: "dateFile", //日志类型
      filename: errorFilename, //日志输出位置
      alwaysIncludePattern: true, //是否总是有后缀名
      pattern: "log-yyyy-MM-dd" //后缀，每小时创建一个新的日志文件
    },
    info: {
      type: 'dateFile',
      filename: infoFilename,
      alwaysIncludePattern: true,
      pattern: 'log-yyyy-MM-dd'
    }
  },
  categories: {
    error: { appenders: ['error'], level: 'error' },
    default: { appenders: ['info'], level: 'info' }
  },
  
  pm2: process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production',
  pm2InstanceVar: 'INSTANCE_ID',
  disableClustering: false
});

module.exports = log4js;