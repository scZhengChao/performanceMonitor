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