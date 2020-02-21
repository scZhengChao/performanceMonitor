let userLogs = require('../../sequelize/relation').users
let customersinfo = (req,res,next)=>{
    let data = JSON.parse(req.body.data).userInfo
    userLogs.create({
        userName:data.userName,
        age:data.age,
        paMonitorCustomerUniqueKey:data.paMonitorCustomerUniqueKey,
    }).then(results=>{
        res.send({err:0,msg:results})
    }).catch(err=>{
        console.log('err user:',err)
        res.send({err:1,msg:err})
    })
 
    
    
}
module.exports = customersinfo