var Sequelize = require('sequelize');
var defineModel = require('../defineModel');

var users = defineModel('users', {
    id: {
        type: Sequelize.STRING(64),
        comment: '设备ID或登陆ID',
        primaryKey: true,
        unique: true
    },
    is_login_id: {
        type: Sequelize.BOOLEAN,
        comment: '是否为登陆id',
        defaultValue:false,
    },
    project: {
        type: Sequelize.STRING(30),
        comment: '项目名',
        defaultValue:'monitor',
    },
    name: {
        type: Sequelize.STRING(30),
        comment: '用户姓名',
        defaultValue:'no name',
    },
    province: {
        type: Sequelize.STRING(30),
        comment: '省份',
        defaultValue:'no province',
    },
    city: {
        type: Sequelize.STRING(30),
        comment: '城市',
        defaultValue:'no city',
    }
}, {
    comment: '用户信息表',
});
module.exports = users;

// CREATE TABLE `users` (
//     `id` varchar(64) NOT NULL COMMENT '设备ID或登陆ID',
//     `is_login_id` tinyint NOT NULL COMMENT '是否为登陆id',
//     `project` varchar(30) NOT NULL COMMENT '项目名',
//     `name` varchar(30) NOT NULL COMMENT '用户姓名',
//     `province` varchar(30) NOT NULL COMMENT '省份',
//     `city` varchar(30) NOT NULL COMMENT '城市',
//     PRIMARY KEY (`id`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;