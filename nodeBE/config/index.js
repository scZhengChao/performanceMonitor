
const path = require('path')
const _ = require('lodash')
let url = `./${process.env.NODE_ENV || 'development'}.js`
let config = require(url) || {}

// 不同环境 公共的配置
let all = {

}
module.exports = _.merge(all, config)