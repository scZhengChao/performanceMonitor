var Sequelize = require('sequelize');
var defineModel = require('../defineModel');

var events = defineModel('events',{
    id:{
        type: Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    distinct_id:{
        type: Sequelize.STRING(64),
        comment:'设备ID或者登陆ID',
    },
    time:{
        type:Sequelize.DATE(6),
        comment:'事件发生时间',
    },
    type:{
        type:Sequelize.STRING(30),
        comment:'神策event类型'
    },
    event:{
        type:Sequelize.STRING(30),
        comment:'事件名'
    },
    project:{
        type:Sequelize.STRING(30),
        comment:'项目名'
    },
    project_env:{
        type:Sequelize.STRING(10),
        comment:'应用环境'
    },
    page_session:{
        type:Sequelize.STRING(25),
        comment:'页面session'
    }, 
    href_url:{
        type:Sequelize.STRING(1024),
        comment:'页面URL',
        validate:{
            isUrl:true
        }
    },
    upload_type:{
        type:Sequelize.STRING(30),
        comment:'上传类型'
    },
    device_name:{
        type:Sequelize.STRING(30),
        comment:'Pc还是mobile'
    },
    sdk_version:{
        type:Sequelize.STRING(10),
        comment:'Sdk版本号'
    },
    browser_name:{
        type:Sequelize.STRING(30),
        comment:'浏览器名'
    },
    browser_version:{
        type:Sequelize.STRING(30),
        comment:'浏览器版本'
    },
    on_page_time:{
        type:Sequelize.INTEGER,
        comment:'页面停留时间'
    }
},{
    comment: '事件表',
});
module.exports = events;

// CREATE TABLE `events` (
//     `id` bigint NOT NULL AUTO_INCREMENT,
//     `distinct_id` varchar(64) NOT NULL COMMENT '设备ID或者登陆ID',
//     `time` datetime NOT NULL COMMENT '事件发生时间',
//     `type` varchar(30) NOT NULL COMMENT '神策event类型',
//     `event` varchar(30) NOT NULL COMMENT '事件名',
//     `project` varchar(30) NOT NULL COMMENT '项目名',
//     `href_url` varchar(1024) NOT NULL COMMENT '页面URL',
//     `upload_type` varchar(30) NOT NULL COMMENT '上传类型',
//     `device_name` varchar(30) NOT NULL COMMENT 'Pc还是mobile',
//     `sdk_version` varchar(10) NOT NULL COMMENT 'Sdk版本号',
//     `browser_name` varchar(30) NOT NULL COMMENT '浏览器名',
//     `browser_version` varchar(30) NOT NULL COMMENT '浏览器版本',
//     `time_on_page` int NOT NULL COMMENT '页面停留时长',
//     PRIMARY KEY (`id`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;