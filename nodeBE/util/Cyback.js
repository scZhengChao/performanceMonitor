
const sha1 = require('js-sha1')
const crypto  = require('crypto')
const fetch = require('./fetch')
const Cyback = require('../config').Cyback
//aes128 解密
const IV = Buffer.from([0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00])
function aes128cbcDecrypt(crypted,key){
    var buf = Buffer.from(crypted,'hex')
    var decipher = crypto.createDecipheriv('aes-12-cbc',Buffer.from(key,'ascii'),IV)
    var decoded = decipher.update(buf,'binary','utf8')
    decoded += decipher.final('utf8')
    return decoded
}

let databaseToCybackData = {
    appId:Cyback.appId,
    appkey:Cyback.appkey,
    folder:Cyback.folder,
    object:Cyback.object,
    sign:sha1(`${this.appId}&${this.appkey}`),
    safe:Cyback.safe,
    reason:Cyback.reason
}
console.log(`Cyback params:`,databaseToCybackData)
function databaseToCyback(){
    return  fetch({
        url:"https://test-ccp.paic.com.cn/pidms/rest/pwd/getPassword",
        method:'post' ,
        data:databaseToCybackData,
        headers:{'Content-Type':"application/json"}
    }).then(res=>{
        console.log('success:',res.statusCode)
        // aes128cbcDecrypt()
        console.log(res)
        return res
    }).catch(err=>{
        return 'zhouhaotian8023'
    })
}

exports.databaseToCyback = databaseToCyback
