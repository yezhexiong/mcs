/********************************
 * Ajax请求封装
 ********************************/

import axios from 'axios';
import globalData from '@/utils/GlobalData';//全局公用数据
import { notification } from 'ant-design-vue'
import router from '@/routers'

axios.defaults.timeout = 5000;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : process.env.VUE_APP_API_BASE_URL   //根据自己配置的反向代理去设置不同环境的baeUrl
// 请求拦截
axios.interceptors.request.use(config => {
  // 1. 这个位置就请求前最后的配置
  // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
  config.headers['Access-Token'] = globalData.AccessToken; 

  // ---- 历史header字段 start ----
  config.headers['dbuser'] = globalData.LoginUserInfo.dbuser; 
  config.headers['username'] = globalData.LoginUserInfo.username; 
  config.headers['userid'] = globalData.LoginUserInfo.userid; 
  config.headers['hospitalid'] = globalData.LoginUserInfo.hospitalid; 
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
    if (!res.data.success&&res.data.code!=="200") {
        console.log('res.data: ', res.data);
        console.log('res.data.success: ', res.data.success);
        console.log('res.data.msg: ', res.data.msg);
        notification.error({
            message: '错误信息1',
            description: res.data.msg
        })

        return Promise.reject(res.data);
    }else{
        return Promise.resolve(res.data);
    }
},errorHandler)

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
     * get 请求
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    Get(url, auth = false) {
        if (auth) {
            return axios.get(url, {headers: {Authorization: 'Your back-end user authenticates information'}});
        } else {
            return axios.get(url);
        }
    },

    /**
     * post 请求
     *
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    Post(url, data, auth = false) {       
        if (auth) {
            return axios.post(url, data, {headers: {Authorization: 'Your back-end user authenticates information'}});
        } else {
            return axios.post(url, data);
        }
    },

    /**
     * put请求
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    Put(url, data, auth = false) {
        if (auth) {
            return axios.put(url, data, {headers: {Authorization: 'Your back-end user authenticates information'}});
        } else {
            return axios.put(url, data);
        }
    },

    /**
     * 删除
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise}
     */
    Del(url, auth = false) {
        if (auth) {
            return axios.delete(url, {headers: {Authorization: 'Your back-end user authenticates information'}});
        } else {
            return axios.delete(url);
        }
    },

    /**
     * 上传文件
     * @param url 接口路由
     * @param file 接口文件
     * @param auth 是否需要带登录信息
     */
    Uploader(url, file, auth = false) {
        let param = new FormData();
        param.append('file', file)
        if (auth) {
            return axios.post(url, param, {headers: {Authorization: 'Your back-end user authenticates information'}})
        } else {
            return axios.post(url, param)
        }
    },
}