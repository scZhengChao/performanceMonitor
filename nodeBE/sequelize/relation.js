// 模型导入 
var seq = require('./index.js');
// 用户信息表
var users = require('./models/users')
//事件表
var events = require('./models/events')

//建立关系
// users:events == > 1:N

users.hasMany(events,{foreignKey:'distinct_id',targetKey:'id',as:'Events'})
events.belongsTo(users)


module.exports = {
    users,
    events
}

// seq.sync({
//     force: true  // 强制同步，先删除表，然后新建
// }).then(()=>{
//     console.log('init db ok')
// }).catch(err=>{
//     console.log('init db error', err.message)
// })