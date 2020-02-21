
let events = require('../sequelize/relation').events
let users = require('../sequelize/relation').users
let server = require('../util/fetch')
let test =  (req,res,next)=>{
    // 去掉favoico。ico
    if(req.url === '/favicon.ico')   return res.send({err:0,msg:'没有 favicon.ico'})

    // 操作从表
    // let arr = [
    //     {
    //         distinct_id:'zc',
    //         time:Date.now(),
    //         type:'iiiii'+Math.random(),
    //         event:'iiiii'+Math.random(),
    //         project:'iiiii'+Math.random(),
    //         herf_url:'https://www.baidu.com/',
    //         upload_type:'iiiii'+Math.random(),
    //         device_name:'iiiii'+Math.random(),
    //         browser_name:'iiiii'+Math.random(), 
    //         browser_version:'iiiii'+Math.random(), 
    //         time_on_page:12412515,
    //     },
    //     {
    //         distinct_id:'zc1',
    //         time:Date.now(),
    //         type:'iiiii'+Math.random(),
    //         event:'iiiii'+Math.random(),
    //         project:'iiiii'+Math.random(),
    //         herf_url:'https://www.baidu.com/',
    //         upload_type:'iiiii'+Math.random(),
    //         device_name:'iiiii'+Math.random(),
    //         browser_name:'iiiii'+Math.random(), 
    //         browser_version:'iiiii'+Math.random(), 
    //         time_on_page:12412515,
    //     },
    //     {
    //         distinct_id:'zc1',
    //         time:Date.now(),
    //         type:'iiiii'+Math.random(),
    //         event:'iiiii'+Math.random(),
    //         project:'iiiii'+Math.random(),
    //         herf_url:'https://www.baidu.com/',
    //         upload_type:'iiiii'+Math.random(),
    //         device_name:'iiiii'+Math.random(),
    //         browser_name:'iiiii'+Math.random(), 
    //         browser_version:'iiiii'+Math.random(), 
    //         time_on_page:12412515,
    //     },
    //     {
    //         distinct_id:'zc',
    //         time:Date.now(),
    //         type:'iiiii'+Math.random(),
    //         event:'iiiii'+Math.random(),
    //         project:'iiiii'+Math.random(),
    //         herf_url:'https://www.baidu.com/',
    //         upload_type:'iiiii'+Math.random(),
    //         device_name:'iiiii'+Math.random(),
    //         browser_name:'iiiii'+Math.random(), 
    //         browser_version:'iiiii'+Math.random(), 
    //         time_on_page:12412515,
    //     },
    //     {
    //         distinct_id:'zc2',
    //         time:Date.now(),
    //         type:'iiiii'+Math.random(),
    //         event:'iiiii'+Math.random(),
    //         project:'iiiii'+Math.random(),
    //         herf_url:'https://www.baidu.com/',
    //         upload_type:'iiiii'+Math.random(),
    //         device_name:'iiiii'+Math.random(),
    //         browser_name:'iiiii'+Math.random(), 
    //         browser_version:'iiiii'+Math.random(), 
    //         time_on_page:12412515,
    //     },
    //     {
    //         distinct_id:'zc2',
    //         time:Date.now(),
    //         type:'iiiii'+Math.random(),
    //         event:'iiiii'+Math.random(),
    //         project:'iiiii'+Math.random(),
    //         herf_url:'https://www.baidu.com/',
    //         upload_type:'iiiii'+Math.random(),
    //         device_name:'iiiii'+Math.random(),
    //         browser_name:'iiiii'+Math.random(), 
    //         browser_version:'iiiii'+Math.random(), 
    //         time_on_page:12412515,
    //     },
    //     {
    //         distinct_id:'zc3',
    //         time:Date.now(),
    //         type:'iiiii'+Math.random(),
    //         event:'iiiii'+Math.random(),
    //         project:'iiiii'+Math.random(),
    //         herf_url:'https://www.baidu.com/',
    //         upload_type:'iiiii'+Math.random(),
    //         device_name:'iiiii'+Math.random(),
    //         browser_name:'iiiii'+Math.random(), 
    //         browser_version:'iiiii'+Math.random(), 
    //         time_on_page:12412515,
    //     },
    // ]
    // events.bulkCreate(arr).then(res=>{
    //     console.log('success')
    // }).catch(err=>{
    //     console.log('fail:',err.message)
    // })



    // 操作 主表
    // let arr = [
    //     {
    //         distinct_id:'zc',
    //         id:Math.round(Math.random()*100000),
    //         project:'iiiii'+Math.random(),
    //         name:'姓名'+Math.random(),
    //         province:'iiiii'+Math.random(),
    //         city:'iiiii'+Math.random(),
           
    //     },
    //     {
    //         distinct_id:'zc1',
    //         id:Math.round(Math.random()*1000000),
    //         project:'iiiii'+Math.random(),
    //         name:'姓名'+Math.random(),
    //         province:'iiiii'+Math.random(),
    //         city:'iiiii'+Math.random(),
           
    //     },
    //     {
    //         distinct_id:'zc2',
    //         id:Math.round(Math.random()*100000),
    //         project:'iiiii'+Math.random(),
    //         name:'姓名'+Math.random(),
    //         province:'iiiii'+Math.random(),
    //         city:'iiiii'+Math.random(),
           
    //     },
    //     {
    //         distinct_id:'zc3',
    //         id:Math.round(Math.random()*100000),
    //         project:'iiiii'+Math.random(),
    //         name:'姓名'+Math.random(),
    //         province:'iiiii'+Math.random(),
    //         city:'iiiii'+Math.random(),
           
    //     },
    // ]
    // users.bulkCreate(arr).then(res=>{
    //     console.log('success')
    // }).catch(err=>{
    //     console.log('failed:'+err.message)
    // })


    // server({
    //     url:'http://127.0.0.1:8000',
    //     data:{a:'get password'},
    //     method:'POST'
    // }).then(result=>{
    //     res.send({err:0,msg:result.data})  //test success
    // })



    // 关联查询  查主表 可以附带从表 但是 查从表 怎么附带不了主表  同时 必须 加一个 as 属性作为 别名
    // users.findAll({
    //     where:{
    //         distinct_id:'zc1'
    //     },
    //     include: {
    //         model:events,
    //         as:'Events',
    //         where:{
    //             time:[]
    //         }
    //     }
    
    // }).then(function(tasks) {
    //     console.log(JSON.stringify(tasks))
    //     res.send({err:0,msg:tasks})
    //     /*
    //       [{
    //         "name": "A Task",
    //         "id": 1,
    //         "createdAt": "2013-03-20T20:31:40.000Z",
    //         "updatedAt": "2013-03-20T20:31:40.000Z",
    //         "userId": 1,
    //         "user": {
    //           "name": "John Doe",
    //           "id": 1,
    //           "createdAt": "2013-03-20T20:31:45.000Z",
    //           "updatedAt": "2013-03-20T20:31:45.000Z"
    //         }
    //       }]
    //     */
    //   })
    logger.info(`log4在pm2模式下会丢失日志；我要看看是不是真的:时间：${new Date().toLocaleString()};pid：${process.pid}`)


    return res.send({err:0,msg:'success'})

}
module.exports = test

