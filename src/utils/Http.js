/********************************
 * Ajax请求封装
 ********************************/

import axios from 'axios';
import jquery from 'jquery';
import globalData from '@/utils/GlobalData';//全局公用数据
import { notification } from 'ant-design-vue'
import router from '@/routers'

let timeout = 5000
let baseUrl = process.env.NODE_ENV === 'production' ? 'http://192.168.150.12:1771' : process.env.VUE_APP_API_BASE_URL   //根据自己配置的反向代理去设置不同环境的baeUrl

axios.defaults.timeout = timeout;
axios.defaults.baseURL = baseUrl
// axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL   //根据自己配置的反向代理去设置不同环境的baeUrl
// 请求拦截
axios.interceptors.request.use(config => {
  // 1. 这个位置就请求前最后的配置
  // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息

  // ---- 历史header字段 start ----
    if(typeof(globalData.LoginUserInfo) !== 'undefined'){
        config.headers['Access-Token'] = globalData.AccessToken; 
        config.headers['dbuser'] = globalData.LoginUserInfo.dbuser; 
        config.headers['username'] = globalData.LoginUserInfo.username; 
        config.headers['userid'] = globalData.LoginUserInfo.userid; 
        config.headers['hospitalid'] = globalData.LoginUserInfo.hospitalid; 
    }
  
  // ---- 历史header字段 end ----

//   loadingInstance = Loading.service({       // 发起请求时加载全局loading，请求失败或有响应时会关闭
//     spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
//     text: '拼命加载中...'
//   })
// if (config.method === 'get') { // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
//     config.params = {
//       ...config.params,
//       t: new Date().getTime()
//     }
//   }
//   // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
//   if (config.url.includes('pur/contract/export')) {
//     config.headers['responseType'] = 'blob'
//   }
//   // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
//   if (config.url.includes('pur/contract/upload')) {
//     config.headers['Content-Type'] = 'multipart/form-data'
//   }
  return config
}, errorHandler)

// 响应拦截
axios.interceptors.response.use(res => {
    // 请求成功
    // 1. 根据自己项目需求定制自己的拦截
    // 2. 然后返回数据
    if (!res.data.success && res.data.code!=="200") {
        notification.error({
            message: '系统提示',
            description: res.data.msg
        })
        return Promise.reject(res.data);
    }else{
        return Promise.resolve(res.data);
    }
},errorHandler)

// jquery ajax 设置默认值
jquery.ajaxSetup({
    timeout: timeout,
    async:false,
    dataType: 'json',
    contentType: "application/json;charset=UTF-8",//设置该格式后，data参数必须用 JSON.stringify(params) 进行处理    
    //请求失败遇到异常触发
    error: function (xhr,status,error) { errorHandler(error)},
    //完成请求后触发。即在success或error触发后触发
    complete: function (xhr, status) { 
        //通过XMLHttpRequest取得响应结果
        // var res = JSON.parse(xhr.responseText)
        // try{
        //     if (!res.data.success && res.data.code!=="200") {
        //         notification.error({
        //             message: '系统提示',
        //             description: res.data.msg
        //         })
        //         return Promise.reject(res.data);
        //     }
            
        // }catch(e){
            console.log(status)
        // }
    },
    //发送请求前触发
    beforeSend: function (xhr) {
        console.log('$.ajaxSetup -> beforeSend1') 
        if(typeof(globalData.LoginUserInfo) !== 'undefined'){
            console.log('可以设置自定义标头') 
            //可以设置自定义标头
            xhr.setRequestHeader('Access-Token',globalData.AccessToken );
            xhr.setRequestHeader('dbuser', globalData.LoginUserInfo.dbuser);
            xhr.setRequestHeader('username', globalData.LoginUserInfo.username);
            xhr.setRequestHeader('userid', globalData.LoginUserInfo.userid);
            xhr.setRequestHeader('hospitalid',globalData.LoginUserInfo.hospitalid );
        }
    },
})

// 异常拦截处理器
const errorHandler = (error) => {
        if (error.response) {
        const data = error.response.data
        let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
        // 从 localstorage 获取 token
        const token = globalData.AccessToken
        if (error.response.status === 403) {
            notification.error({
                message: '错误信息',
                description: tips
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            })
            if (token) {
                router.push({
                    path: `/login`
                  })
                // store.dispatch('Logout').then(() => {
                //   setTimeout(() => {
                //     window.location.reload()
                //   }, 1500)
                // })
            }
        }
    }
    return Promise.reject(error)
}
let httpCode = {        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
    400: '请求参数错误',
    401: '权限不足, 请重新登录',
    403: '服务器拒绝本次访问',
    404: '请求资源未找到',
    500: '内部服务器错误',
    501: '服务器不支持该请求中使用的方法',
    502: '网关错误',
    504: '网关超时'
}

export default {
    /**
     * get 同步请求 jquery 方法
     * @param {*} url 
     * @param {*} params
     */
    Get: function (url, params) {
        console.log('url=',url)
        let res = null
        jquery.ajax({
            url: baseUrl+url,
            type: "get",
            data: JSON.stringify(params),
            success: function (result) {
                res = result.data
            }
        });
        return res
    },

    /**
     * Posst 同步请求 jquery 方法
     * @param {*} url 
     * @param {*} params
     */
    Post: function (url, params) {
        console.log('params=',params)
        let res = null
        jquery.ajax({
            url: baseUrl+url,
            type: "post",
            data: JSON.stringify(params),
            success: function (result) {
                console.log('post->params = ',params)
                res = result.data
            }
        });
        return res
    },

    /**
     * Put 同步请求 jquery 方法
     * @param {*} url 
     * @param {*} params
     */
    Put: function (url, params) {
        let res = null
        jquery.ajax({
            url: baseUrl+url,
            type: "put",
            data: JSON.stringify(params),
            success: function (result) {
                res = result.data
            }
        });
        return res
    },
    /**
     * Delete 同步请求 jquery 方法
     * @param {*} url 
     * @param {*} params
     */
    Delete: function (url, params) {
        let res = null
        jquery.ajax({
            url: baseUrl+url,            
            type: "delete",
            data: JSON.stringify(params),
            success: function (result) {
                res = result.data
            }
        });
        return res
    },
    /**
     * get 异步请求 axios方法
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     */
    async AsyncGet(url) {
        return axios.get(url);
    },

    /**
     * post 异步请求 axios方法
     *
     * @param url 接口路由
     * @param params 接口参数
     * @param auth 是否需要带登录信息
     */
    async AsyncPost(url, params) {       
        return axios.post(url, params);
    },

    /**
     * put 异步请求 axios方法
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要带登录信息
     */
    async AsyncPut(url, data) {
        return axios.put(url, data);
    },

    /**
     * 删除 异步请求 axios方法
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     */
    async AsyncDel(url) {
        return axios.delete(url);
    },

    /**
     * 上传文件 axios方法
     * @param url 接口路由
     * @param file 接口文件
     */
    Uploader(url, file) {
        let param = new FormData();
        param.append('file', file)
        return axios.post(url, param)
    },
}