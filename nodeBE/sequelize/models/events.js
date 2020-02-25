const Sequelize = require('sequelize')
const modelGenerator = require('../defineModel')

module.exports = modelGenerator('events',
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    distinct_id: {
      type: Sequelize.STRING(64),
      comment: '设备ID或者登陆ID',
      defaultValue: '',
    },
    time: {
      type: Sequelize.DATE,
      comment: '事件发生时间',
      defaultValue: Sequelize.NOW(),
    },
    type: {
      type: Sequelize.STRING(30),
      comment: '神策event类型',
      defaultValue: '',
    },
    event: {
      type: Sequelize.STRING(30),
      comment: '事件名',
      defaultValue: '',
    },
    project: {
      type: Sequelize.STRING(30),
      comment: '项目名',
      defaultValue: '',
    },
    project_env: {
      type: Sequelize.STRING(10),
      comment: '应用环境',
      defaultValue: '',
    },
    page_session: {
      type: Sequelize.STRING(32),
      comment: '页面session',
      defaultValue: '',
    },
    href_url: {
      type: Sequelize.STRING(1024),
      comment: '页面URL',
      defaultValue: 'http://www.baidu.com',
      validate: {
        isUrl: true
      }
    },
    upload_type: {
      type: Sequelize.STRING(30),
      comment: '上传类型',
      defaultValue: '',
    },
    device_name: {
      type: Sequelize.STRING(30),
      comment: 'Pc还是mobile',
      defaultValue: '',
    },
    sdk_version: {
      type: Sequelize.STRING(10),
      comment: 'Sdk版本号',
      defaultValue: '',
    },
    browser_name: {
      type: Sequelize.STRING(30),
      comment: '浏览器名',
      defaultValue: '',
    },
    browser_version: {
      type: Sequelize.STRING(30),
      comment: '浏览器版本',
      defaultValue: '',
    },
    on_page_time: {
      type: Sequelize.INTEGER,
      comment: '页面停留时间',
      defaultValue: 0,
    }
  },
  '事件表'
)

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
