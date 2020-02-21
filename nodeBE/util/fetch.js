let axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/x-www-fotm-urlencoded'
// 创建axios实例s
const fetch = axios.create({
    timeout: 60 * 1000 // 请求超时时间
})
  
// request拦截器,拦截每一个请求加上请求头
fetch.interceptors.request.use(
    config => {
        return config
    },
    error => {
    Promise.reject(error)
})

// respone拦截器 拦截到所有的response，然后先做一些判断
fetch.interceptors.response.use(
    response => {
        return response
    },error => {
        return Promise.reject(error)
})

module.exports = fetch
