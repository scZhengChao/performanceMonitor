let sqlLogs = require('../../sequelize/relation').events
// [
//     {
//       webId: 'zhengchao',
//       happenedTime: 1582274897322,
//       pageSession: '5dteyq2zokx-1582274784845',
//       customerUnqKey: 'zm3c0ehujze-1581146664209',
//       hrefUrl: 'http://localhost:8080/#/',
//       pageEvent: 'page_beforeunload',
//       onPageTime: 111176,
//       uploadType: 'PV',
//       deviceName: 'PC',
//       browserName: 'chrome',
//       browserVersion: '80.0.3987.87'
//     },
//     {
//       webId: 'zhengchao',
//       happenedTime: 1582274899150,
//       pageSession: 'wvs3w2i5ilh-1582274897734',
//       customerUnqKey: 'zm3c0ehujze-1581146664209',
//       hrefUrl: 'http://localhost:8080/#/',
//       pageEvent: 'page_load',
//       uploadType: 'PV',
//       deviceName: 'PC',
//       browserName: 'chrome',
//       browserVersion: '80.0.3987.87'
//     }
//   ]
  
let logs = (req,res,next)=>{
    let data = JSON.parse(req.body.data).logInfo.split('$$$')
    data.pop()
    let arr = data.map(item=>JSON.parse(item))
    console.log(arr)
    let seqarr = []
    arr.forEach(item => {
        seqarr.push({
            distinct_id:item.customerUnqKey,
            time:item.happenedTime,
            type:'track',
            event:item.pageEvent,
            project:item.webId,
            herf_url:item.hrefUrl,
            upload_type:item.uploadType,
            device_name:item.deviceName,
            sdk_version:item.customerUnike || 'hah',
            browser_name:item.browserName,
            browser_version:item.browserVersion,
            time_on_page:item.onPageTime
        })
    });
    sqlLogs.bulkCreate(seqarr).then(results=>{
        res.send({code:100000,msg:'success'})
    }).catch(err=>{
        // console.log('err logs:',err)
        res.send({code:10001,msg:err})
    })
   
    // res.send({code:10001,msg:'success'})
  

}
module.exports = logs