
let http = require('http')
let qs = require('querystring')
let server = http.createServer((req,res)=>{
    const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`您的 IP 地址是 ${ip}，源端口是 ${port}`);
    let str = ''
    let data;
    req.on('data',chunk=>{
        str += chunk
    })
    req.on('end',()=>{
        // data = qs.parse(str)
        res.write(str)
        res.end()
    })
    
})
server.listen(8000,'127.0.0.1',()=>{
    console.log('server is running')
})