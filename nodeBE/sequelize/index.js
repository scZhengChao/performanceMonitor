let Sequelize  = require('sequelize')
let config = require('../config')
let cbForPassword = require('../util/Cyback')
// 数据库配置文件
var sqlConfig = config.mysqlConfig

console.log('init sequelize...');
console.log(`mysql:pamonitor;env:${process.env.NODE_ENV};host:${sqlConfig.host};port:${sqlConfig.port}`);

//Sequelize会在初始化时设置一个连接池，这样你应该为每个数据库创建一个实例：
let password ;
let seq;

module.exports = process.env.NODE_ENV ==='development'?getDatabasePassword('123456'): getDatabasePassword()
async function getDatabasePassword(pw){
    if(pw){
        password = pw
    }else{
        await cbForPassword.databaseToCyback().then(res=>{
            console.log('password:',res)
            password = res
        })
    }
    seq = new Sequelize(config.databaseName, config.databaseUser,password, sqlConfig);
    return seq
        .authenticate()
        .then((result) => {
            console.log('Connection has been established successfully.');
            return {
                code:'success',
                data:seq
            }
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err.message);
            return {
                code:'failed',
                data:err
            }
        });
    
}

