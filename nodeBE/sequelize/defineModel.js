// 自定义规范 model, 导出model生成函数
const seqClient = require('./index').getClient()
module.exports = (name, attributes,config={}) => {
    let attrs = {};
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
    let conf = Object.assign({},defaultConfig,config)
    return seqClient.define(name, attrs, conf)
};
