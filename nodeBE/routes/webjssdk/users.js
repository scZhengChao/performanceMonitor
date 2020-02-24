let relationsGenerator = require('../../sequelize/relation')()
let customersinfo = (req, res, next) => {
  let data = JSON.parse(req.body.data).userInfo
  relationsGenerator.then(relations => {
    relations.users.findOrCreate({
      where: {
        id: data.id
      },
      defaults: {
        name: data.name || '',
        is_login_id: data.is_login_id
      }
    }).then(([user, created]) => {
      res.send({
        code: 100001, msg: {
          user: user,
          created: created
        }
      })
    }).catch(err => {
      console.log('err user:', err)
      logger.error(error)
      res.send({ code: 1, msg: err })
    })
  })
}
module.exports = customersinfo
