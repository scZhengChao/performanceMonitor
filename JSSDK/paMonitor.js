/*
 * Web 监控
 * 
 */
(function(window){
    // 接入的业务系统配置
    var config = {
        project: '',                // 系统ID
        version: '1.0',             // 系统版本
        dev: 'prd',                 // 默认prd（dev，stg）
        isSPA: true,                // 采集页面是否单页面，不传默认是true，传统页面必需传入
        checkVisible: false         // 页面可见开关(影响pv统计，页面时长统计)，不传默认是关闭
    };

    var windowUnloadFlg = false;    // 刷新关闭页面时，触发了visibilitychange，但不存localstorage
    // 日志上报接口地址
    var monitorServerLogs = 'http://localhost:3008/jssdk/logs';
    // 上报客户信息接口地址
    var monitorServerCustomerInfo = 'http://localhost:3008/jssdk/customersinfo';

    var timeOnPage = ''                    // 页面停留时长
    ,totalNotOnPageTime = ''               // 累计页面不活跃(页面最小化，页面被tab掉...)时长
    ,pageNotActive = false                 // 页面是不活跃状态
    ,locationPathname = location.href      // 页面path
    ,pageStartTime = new Date().getTime()  // 页面开始加载的时间戳
    ,monitorCustomerUnqKey = localStorage['paMonitorCustomerUniqueKey']

    /*
    * 当传统页面onload & SPA页面路由跳转，需要初始化页面变量
    */
    function initPageVaribles() {
        timeOnPage = ''
        totalNotOnPageTime = ''
        pageNotActive = false
        locationPathname = location.href
        pageStartTime = new Date().getTime()
    };

    // 工具类实例化
    var paUtls = new PAUtils();

    // 工具类以及添加原型方法
    function PAUtils() {};

    // 设置接入系统config
    PAUtils.prototype.setConfig = function(obj) {
        Object.assign(config,obj)
        console.log("JSSDK OUTPUT: config " + config)
    };
    /**
     * 返回随机字符串标识: ezcxrwllb2v-1580977861554
     */
    PAUtils.prototype.getUid = function() {
        var timeStamp = new Date().getTime()
        return Math.random().toString(36).substring(2) + '-' + timeStamp;
    };
    /**
     * 获取用户的唯一标识(UV)
     */
    PAUtils.prototype.getCustomerUnqKey = function () {   
        if (!monitorCustomerUnqKey) {
            var customerKey = this.getUid()
            var userInfo = {id: customerKey, is_login_id: false}
            // 发送用户信息到服务端
            paUtls.ajax(monitorServerCustomerInfo, false, {userInfo: userInfo}, function(res){
                // 成功回调
                if (res.code == '100001'){
                    console.log('JSSDK OUTPUT: user information send successed')
                    localStorage['paMonitorCustomerUniqueKey'] = customerKey
                    monitorCustomerUnqKey = customerKey
                }               
            }, function(){
                console.log('JSSDK OUTPUT: user information send failed')
            })
        }
        return localStorage['paMonitorCustomerUniqueKey']
    };
    /**
     * 当应用系统调用此方法
     */
    PAUtils.prototype.getCustomerInfo = function(userInfo) {
        // 发送用户信息到服务端
        paUtls.ajax(monitorServerCustomerInfo, true, {userInfo: Object.assign(userInfo, {is_login_id: true})}, function(res){
            // 成功回调
            if (res.code == '100001'){
                console.log('JSSDK OUTPUT: user information send successed')
                localStorage['paMonitorCustomerUniqueKey'] = userInfo.id
                monitorCustomerUnqKey = userInfo.id
            }               
        }, function(){
            console.log('JSSDK OUTPUT: user information send failed')
        })
    };

    // 设备信息统计
    PAUtils.prototype.getDeviceInfo = function() {
        var device = {}
        var ua = navigator.userAgent
        device.deviceName = "PC"
        if (ua.indexOf("Mobile") == -1) {
            var agent = navigator.userAgent.toLowerCase()
            var regStr_ie = /msie [\d.]+;/gi
            var regStr_chrome = /chrome\/[\d.]+/gi
            device.browserName = 'Unknown'
            // IE
            if(agent.indexOf("msie") > 0) {
                var browserInfo = agent.match(regStr_ie)[0]
                device.browserName = browserInfo.split('/')[0]
                device.browserVersion = browserInfo.split('/')[1]
            }
            // Chrome
            if(agent.indexOf("chrome") > 0) {
                var browserInfo = agent.match(regStr_chrome)[0]
                device.browserName = browserInfo.split('/')[0]
                device.browserVersion = browserInfo.split('/')[1]
            }
            // 此处需要增加微信浏览器的判断
            
        }
        return device;
    };
    /*
    * 封装ajax请求
    * @param url     请求URL
    * @param sync    请求异步还是同步
    * @param param   请求参数
    * @param successCallback  成功回调方法
    * @param failCallback     失败回调方法
    */
    PAUtils.prototype.ajax = function(url, sync, param, successCallback, failCallback) {
        // 部门是ie11 & chrome，不需要考虑太复杂
        if (sync !== false) sync = true
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('POST', url, sync)
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if(xmlHttp.status == 200) {
                    var res = JSON.parse(xmlHttp.responseText)
                    typeof successCallback == 'function' && successCallback(res)
                } else {
                    typeof failCallback == 'function' && failCallback()
                }
            }
        }
        xmlHttp.send("data=" + JSON.stringify(param))
    };

    // 页面唯一session，从load到beforeunload为一个session
    var pageSession = paUtls.getUid()

    // 设置日志对象类的通用属性
    function commonProperty() {
        // 用于区分应用的唯一标识
        this.project = config.project
        // SDK版本
        this.sdk_version = config.version
        // 应用系统环境
        this.project_env =  config.dev
        // 日志发生时间戳
        this.time = new Date().getTime()
        // 页面唯一session，刷新后session会重置
        this.page_session = pageSession
        // UV信息,客户唯一标识
        this.distinct_id = paUtls.getCustomerUnqKey()
    };
    // PV构造函数
    function PVFunc(uploadType, pageEvent, onPageTime) {
        commonProperty.apply(this)
        this.href_url =  locationPathname
        this.event = pageEvent
        this.on_page_time = onPageTime
        var deviceInfo = paUtls.getDeviceInfo()
        this.upload_type = uploadType
        this.device_name = deviceInfo.deviceName
        this.browser_name = deviceInfo.browserName
        this.browser_version = deviceInfo.browserVersion
    };
    PVFunc.prototype.handle = function() {
        var tempString = localStorage[this.uploadType] ? localStorage[this.uploadType] : ""
        localStorage['PV'] = tempString + JSON.stringify(this) + '$$$'
    };

    // 监控构造函数入口
    function PaMonitor(){
        console.log('JSSDK OUTPUT: come in')
    };
    PaMonitor.prototype.init=function(configObj) {
        // 应用系统config参数
        paUtls.setConfig(configObj)
        // 开启上报
        report2Server();
        // 处理页面load beforeunload事件
        this.handlePageLoad()
        // 应用系统打开页面visible的情况统计
        config.checkVisible && this.checkPageVisible()
        // 单页面统计
        config.isSPA && this.handleRouterChange()
    };
    /*
     * 页面加载时只执行onload
     * 页面关闭时先执行onbeforeunload，最后onunload
     * 页面刷新时先执行onbeforeunload，然后onunload，最后onload
     */
    PaMonitor.prototype.handlePageLoad = function () {
        // spa页面首次加载记录一次pv
        // 传统页面加载
        window.addEventListener('load', function(){
            initPageVaribles()
            pvToStorage('page_load')
        })
        window.addEventListener('beforeunload', function(){
            // 关闭页面与刷新时，立即上报一次同步请求
            windowUnloadFlg = true
            // 计算页面停留时长
            doStayOnPageFunc()
            pvToStorage('page_beforeunload', timeOnPage)
            var logInfo = localStorage['PV']
            // 同步请求
            paUtls.ajax(monitorServerLogs, false, {logInfo: logInfo}, function(res){
                // 成功回调
                if (res.code == '100001'){
                    localStorage['PV'] = ''
                    console.log('JSSDK OUTPUT: reported to server')
                }               
            }, function(){
                // 此处重要，据统计JSSDK丢数据概率不超过5%，
                // 但是在关闭页面的情况下，丢失率会增加，移动端会更加丢失严重
                // 此处不清空localstorage，下次再次打开时，上报一次
                // localStorage['PV'] = ''
                console.log('JSSDK OUTPUT: report failed')
            })
        })
    };

    // 重写pushState & replaceState 方法
    PaMonitor.prototype.handleRouterChange = function () {
        window.history.pushState = handleHistoryState('pushState')
        window.history.replaceState = handleHistoryState('replaceState')
    };

    // 闭包，在pushState & replaceState触发自定义popstate事件
    function handleHistoryState(type) {
        var historyState = window.history[type]
        return  function () {
            var rv = historyState.apply(this, arguments)
            // 触发popstate
            const event = new Event('popstate')
            event.arguments = arguments
            window.dispatchEvent(event);
            return rv
        }
    };

    /*
     * history.pushState | history.replaceState
     * history.go | history.back | history.forward
     * hashchange
     * 都将触发popstate事件
     */
    window.addEventListener('popstate', function() {
        // hashchange statechange触发popstate事件, 
        // 以beforeunload&load记录到localstorage
        doStayOnPageFunc()
        pvToStorage('beforeunload', timeOnPage)
        initPageVaribles()
        pvToStorage('load')
    });
    /**
     * page 可见性监控（最小化，被tab掉等页面不可见场景）
     */
    PaMonitor.prototype.checkPageVisible = function () {
        // 如果浏览器不支持Page Visibility API 给出提示
        if (typeof document['hidden'] == "undefined") {
            console.log("JSSDK OUTPUT: The browser does not support the Page Visibility API.")
        } else {
            // 页面可见时的时间戳
            var pageVisibleTime = ''
            // 页面不可见时的时间戳
            var pageUnvisibleTime = ''
            document.addEventListener('visibilitychange', function(){
                if(windowUnloadFlg == true) return
                // 上报信息
                // 此处需要添加时间的多次累计逻辑
                if (document.visibilityState == 'visible') {
                    pageVisibleTime = new Date().getTime()
                    totalNotOnPageTime = totalNotOnPageTime + pageVisibleTime - pageUnvisibleTime
                    console.log('JSSDK OUTPUT: totalNotOnPageTime ' + totalNotOnPageTime)
                    // 时间间隔大于30mins，记录一次pv
                    if (pageVisibleTime - pageUnvisibleTime >= 30*60*1000) {
                        pvToStorage('load')
                    } else {
                        pvToStorage(document.visibilityState)
                    }
                } else {
                    pageNotActive = true
                    pageUnvisibleTime = new Date().getTime()
                    pvToStorage(document.visibilityState)
                    console.log('JSSDK OUTPUT: pageUnvisibleTime ' + pageUnvisibleTime)
                }
            }, false)
        }
    };

    // PV信息存入localstorage
    function pvToStorage(pageEvent, timeOnPage) {
        var pe = pageEvent
        var pvFunc = new PVFunc('PV', pe, timeOnPage)
        pvFunc.handle()
    };
    
    // 计算页面停留时长
    function doStayOnPageFunc() {
        var newPageStartTime = new Date().getTime()
        timeOnPage = newPageStartTime - pageStartTime
        console.log('JSSDK OUTPUT: page stage time '+ timeOnPage)
        if(config.checkVisible && pageNotActive) {
            // 当页面最小化，tab 等情况，页面处于不活跃状态
            timeOnPage = timeOnPage - totalNotOnPageTime
            console.log('JSSDK OUTPUT: page stage time '+ timeOnPage)
        }
    };

    /*
     * 暂定每30s上报一次
     */
    function report2Server(sync){
        setInterval(function () {
            var logInfo = localStorage['PV'];
            logInfo != '' && logInfo.length > 0 && paUtls.ajax(monitorServerLogs, sync, {logInfo: logInfo}, function(res){
                // 成功回调
                if (res.code == '100001'){
                    console.log('JSSDK OUTPUT: reported to server')
                    localStorage['PV'] = ''
                }               
            }, function(){
                // 在正常轮询发请求时，异常概率较小（丢数据概率不超过5%），此处需要清空localstorage
                localStorage['PV'] = ''
                console.log('JSSDK OUTPUT: report failed')
            })
        }, 30*1000)
    };

    // paMonitor & paUtils暴露给业务系统，挂载到window对象
    // 在业务系统内调用paMonitor.init
    window.paMonitor = new PaMonitor();
    // 在业务系统内调用paUtils.getCustomerInfo({id:'WUYANZU001', is_login_id: 1})
    window.paUtils = new PAUtils();

})(window);
