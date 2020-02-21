let Sequelize  = require('sequelize')

// 数据库配置文件
var sqlConfig = require('../config').mysqlConfig


console.log('init sequelize...');
console.log(`mysql:pamonitor;host:${sqlConfig.host};port:${sqlConfig.port}`);


//Sequelize会在初始化时设置一个连接池，这样你应该为每个数据库创建一个实例：
var seq = new Sequelize('pamonitor', 'root','root' , sqlConfig);
seq
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = seq