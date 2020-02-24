// 自定义规范 model 
let Sequelize = require('sequelize')
let seqPro = require('./index')
let  defineModel = async function (name, attributes,config={}) {
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
    // return seqPro.then((seq)=>{
    //     console.log('seqPro', seq)
    //     seq.define(name, attrs, conf);
    // })
    let seq = await require('./index')()
    console.log('22222', seq)
    return seq.define(name, attrs, conf)
};


module.exports = defineModel
