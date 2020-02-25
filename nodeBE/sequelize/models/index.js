var usersConfig = require('./users')
var eventsConfig = require('./events')
module.exports =  async function () {
  console.log('333')
  var modelsGenerator = await require('../defineModel')
  var user = await modelsGenerator(usersConfig.name, usersConfig.attributes, usersConfig.comment)
  var events = await modelsGenerator(eventsConfig.name, eventsConfig.attributes, eventsConfig.comment)
  return {
    user: user,
    events: events
  }
}
