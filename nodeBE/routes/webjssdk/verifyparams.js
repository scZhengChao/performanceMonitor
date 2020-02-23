let verifyparams = (req,res,next)=>{
    // 参数配置
    // console.log(req.body.data)
    res.send({code:100000,msg:'校验通过'})
}
module.exports = verifyparams