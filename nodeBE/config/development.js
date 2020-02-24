
const path = require('path')
// 开发环境需要修改次地址
var config = {
    env: 'development', //环境名称
    port: 3000,         //服务端口号
    mysqlConfig: {
        host: "127.0.0.1",
        dialect:"mysql",
        port: '3306',       //  接数据库的端口
        protocol: 'tcp',    //  连接数据库使用的协议
        pool: {
            max: 50,       //连接池上线
            min: 10,          //连接池下线
            acquire: 10000,     //请求超时时间  10s
            idle: 30000          //断开连接后，连接实例在连接池保持的时间 30s 
        },
        omitNull: false,    //  null 是否通过SQL语句查询
        timezone: '+08:00',  //  解决时差 - 默认存储时间存在8小时误差
        logging:true, // 输出日志信息  开发测试可以用一用
        //Changing the default model options  数据库默认参数,全局参数
        define: {
            // 不使用驼峰式命令规则，这样会在使用下划线分隔
            // 这样 updatedAt 的字段名会是 updated_at
            underscored: false,
            // 冻结表名
            freezeTableName: false,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            //默认添加两个字段createdAt和updatedAt false则不添加
            timestamps: false,
            paranoid: false,  // 增加了deleteAt
        },
    },
    accessLogOutputPath: path.join(__dirname, '../', 'logs'),  //服务日志
    appInfoLogOutputPath: path.join(__dirname, '../', 'logs/info'),  //应用 info 级别 日志地址
    appErrorLogOutputPath: path.join(__dirname, '../', 'logs/error') ,    //应用 error 级别 日志地址
};
 module.exports=config;

 1000/200*50   250/s
 50*10000/(2*25-1*50)