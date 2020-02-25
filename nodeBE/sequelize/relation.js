//建立关系
// users:events == > 1:N
const users = require('./models/users')
const events = require('./models/events')
users.hasMany(events, { foreignKey: 'distinct_id', targetKey: 'id', as: 'Events' })
events.belongsTo(users)

module.exports = {
  users,
  events
}
