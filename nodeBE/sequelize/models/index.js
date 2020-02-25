// 为了公用同一个seq实例
const usersConfig = require('./users')
const eventsConfig = require('./events')
module.exports =  async function () {
  const modelsGenerator = await require('../defineModel')
  let user = await modelsGenerator(usersConfig.name, usersConfig.attributes, usersConfig.comment)
  let events = await modelsGenerator(eventsConfig.name, eventsConfig.attributes, eventsConfig.comment)
  return {
    user: user,
    events: events
  }
}
