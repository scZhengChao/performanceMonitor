let sqlLogs = require('../../sequelize/relation').events
let logs = (req,res,next)=>{
    let data = JSON.parse(req.body.data).logInfo.split('$$$')
    data.pop()
    let arr = data.map(item=>JSON.parse(item))
    console.log(arr)

    // {
    //     project: 'BOTA',
    //     sdk_version: '1.0',
    //     project_env: 'test',
    //     time: 1582511775401,
    //     page_session: '4hola3oy3a1-1582511527060',
    //     distinct_id: '5931',
    //     href_url: 'http://localhost:8080/#/',
    //     event: 'visible',
    //     upload_type: 'PV',
    //     device_name: 'PC',
    //     browser_name: 'chrome',
    //     browser_version: '80.0.3987.87'
    //   }
    
    let seqarr = []
    arr.forEach(item => {
        seqarr.push({
            distinct_id:item.distinct_id,
            time:item.time,
            type:'track',
            event:item.event,
            project:item.project,
            href_url:item.href_url,
            upload_type:item.upload_type,
            device_name:item.device_name,
            sdk_version:item.sdk_version,
            browser_name:item.browser_name,
            browser_version:item.browser_version,
            time_on_page:item.time_on_page,
            page_session:item.page_session,
            project_env:item.project_env
        })
    });
    sqlLogs.bulkCreate(seqarr).then(results=>{
        res.send({code:100001,msg:'success'})
    }).catch(err=>{
        // console.log('err logs:',err)
        res.send({code:100000,msg:err})
    })
   
    // res.send({code:10001,msg:'success'})
  

}
module.exports = logs