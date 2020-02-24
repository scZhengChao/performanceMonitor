let userLogs = require('../../sequelize/relation').users
let customersinfo = (req,res,next)=>{
    let data = JSON.parse(req.body.data).userInfo
    userLogs.create({
        id:data.id,
    }).then(results=>{
        res.send({code:100001,msg:results})
    }).catch(err=>{
        console.log('err user:',err)
        logger.error(error)
        res.send({code:100000,msg:err})
    })    
}
module.exports = customersinfo