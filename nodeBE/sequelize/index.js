const Sequelize = require('sequelize')
const config = require('../config')
// 数据库配置文件
const sqlConfig = config.mysqlConfig

console.log('init sequelize...')
console.log(`mysql:pamonitor;env:${process.env.NODE_ENV};host:${sqlConfig.host};port:${sqlConfig.port}`)

//Sequelize会在初始化时设置一个连接池，这样你应该为每个数据库创建一个实例：
let seqClient = {}
module.exports = {
  // 连接数据库
  connect: password => {
    return new Promise((resolve, reject) => {
      seqClient = new Sequelize(config.databaseName, config.databaseUser, password, sqlConfig)
      seqClient.authenticate()
        .then(() => {
          resolve()
          console.log('Connection has been established successfully.')
        })
        .catch(err => {
          reject(err)
          console.error('Unable to connect to the database:', err.message)
        })
    })
  },
  // 获取seq实例
  getClient: () => {
    return seqClient
  }
}

