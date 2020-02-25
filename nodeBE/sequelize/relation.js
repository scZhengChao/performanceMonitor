//建立关系
// users:events == > 1:N
module.exports = async function () {
  // 用户信息表
  var users = await require('./models/users')()
  console.log('relation111',users)
  //事件表
  var events = await require('./models/events')()
  users.hasMany(events, { foreignKey: 'distinct_id', targetKey: 'id', as: 'Events' })
  events.belongsTo(users)
  return {
    users,
    events
  }
}
