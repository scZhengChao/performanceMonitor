let Sequelize  = require('sequelize')
let config = require('../config')
let cbForPassword = require('../util/Cyback')
// 数据库配置文件
var sqlConfig = config.mysqlConfig

console.log('init sequelize...');
console.log(`mysql:pamonitor;env:${process.env.NODE_ENV};host:${sqlConfig.host};port:${sqlConfig.port}`);

//Sequelize会在初始化时设置一个连接池，这样你应该为每个数据库创建一个实例：
let password ;
async function getDatabasePassword(pw){
    if(pw){
        password = pw
    }else{
        password =  await require('../util/Cyback').databaseToCyback()
        console.log('password',password)
        let seq = new Sequelize(config.databaseName, config.databaseUser, password, sqlConfig);
        let seqModel = seq.authenticate()
           .then(() => {
               console.log('Connection has been established successfully.');
           })
           .catch(err => {
               console.error('Unable to connect to the database:', err.message);
           });
        console.log('seqModel')
        return seqModel
    }
}
module.exports = getDatabasePassword

