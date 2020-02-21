const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const logDirectory = require('../config/index').accessLogOutputPath

console.log('AccessLog path: ' + logDirectory)

// 每日创建access.log
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // 每日
    path: logDirectory
})

// 自定义token,不然时区不对
morgan.token('localDate',function() {  
    return new Date().toLocaleString()
}) 
// 自定义输出日志格式
let accLogFormat = ':remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :req[header] :status :res[content-length] ":referrer" ":user-agent"'
module.exports = morgan(accLogFormat, {stream: accessLogStream}, {flags: 'a'})

