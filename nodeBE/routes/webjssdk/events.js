let sqlLogs = require('../../sequelize/relation').events
let logs = (req,res,next)=>{
    let data = JSON.parse(req.body.data).logInfo.split('$$$')
    data.pop()
    let arr = data.map(item=>JSON.parse(item))
    sqlLogs.bulkCreate(arr).then(results=>{
        res.send({code:100000,msg:results})
    }).catch(err=>{
        console.log('err logs:',err)
        res.send({code:10001,msg:err})
    })
   

  

}
module.exports = logs