const events = require('../../sequelize/relation').events
module.exports = function (req, res, next) {
  let data = JSON.parse(req.body.data).logInfo.split('$$$')
  data.pop()
  let arr = data.map(item => JSON.parse(item))
  let seqarr = []
  arr.forEach(item => {
    seqarr.push({
      distinct_id: item.distinct_id,
      time: item.time,
      type: 'track',
      event: item.event,
      project: item.project,
      href_url: item.href_url,
      upload_type: item.upload_type,
      device_name: item.device_name,
      sdk_version: item.sdk_version,
      browser_name: item.browser_name,
      browser_version: item.browser_version,
      on_page_time: item.on_page_time,
      page_session: item.page_session,
      project_env: item.project_env
    })
  })
  events.bulkCreate(seqarr).then(results => {
    res.send({ code: 100001, msg: 'success' })
  }).catch(err => {
    // console.log('err logs:',err)
    res.send({ code: 100000, msg: err })
  })
}
