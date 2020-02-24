// 自定义规范 model 
// let Sequelize = require('sequelize')
// let seq = require('./index')
let  defineModel = function (name, attributes,config={}) {
    var attrs = {};
    for (let key in attributes) {  //全部转换成对象模式
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            attrs[key] = Object.assign({},{
                allowNull:false,
            },value);
        } else {
            attrs[key] = {
                type: value,
                allowNull:false,
            };
        }
    }
    let defaultConfig = {
        tableName: name, //表名
    
    }
    conf = Object.assign({},defaultConfig,config)
    return seq.define(name, attrs, conf);
   
};
module.exports = defineModel