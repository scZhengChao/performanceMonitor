//批量同步表结构  
// var seq = require('./index.js');
var fs = require('fs');
var files = fs.readdirSync(__dirname + '/models');
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);
console.log(js_files);
module.exports = {};
for (var f of js_files) {
    console.log(`import model from file ${f}...`);
    var name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}
seq.sync({
    force: true,  // 强制同步，先删除表，然后新建
    // alter: true //如果表已存在，不过丢弃，如果不存在会直接创建表
}).then(()=>{
    console.log('init db ok')
}).catch(err=>{
    console.log('init db error', err)
})