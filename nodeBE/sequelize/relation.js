//建立关系
// users:events == > 1:N
module.exports = async function () {
  var models = await require('./models/index')()
  console.log('models', models)
  // 用户信息表
  var users = models.user
  //事件表
  var events = models.events
  users.hasMany(events, { foreignKey: 'distinct_id', targetKey: 'id', as: 'Events' })
  events.belongsTo(users)
  return {
    users,
    events
  }
}
