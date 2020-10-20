/********************************
 * 相关公用全局数据
 ********************************/

import storage from 'store'
import { LOGIN_USER_INFO,ACCESS_TOKEN } from '@/contract/Const'


export default {
    _loginUserInfo : null,//实际上也是能访问的，人为约定外部不能访问
    /**
     * 获取登录用户信息
     */
    get LoginUserInfo(){
        if(this._loginUserInfo === null){
            this._loginUserInfo = storage.get(LOGIN_USER_INFO);
            console.log("this._loginUserInfo === null")
        }
        //如果storage也没数据，则从新请求获取
        //...
        return this._loginUserInfo;
    },
    /**
     * 设置登录用户信息
     */
    set LoginUserInfo(val){
        storage.set(LOGIN_USER_INFO, val, 7 * 24 * 60 * 60 * 1000)
        this._loginUserInfo=val;
    },

    _accessToken:"",
    /**
     * 获取范围令牌
     */
    get AccessToken(){
        if(this._accessToken === ""){
            this._accessToken = storage.get(ACCESS_TOKEN);
            console.log("this._userInfo === null")
        }
        return this._userInfo;
    },
    /**
     * 设置范围令牌
     */
    set AccessToken(val){
        storage.set(ACCESS_TOKEN, val, 7 * 24 * 60 * 60 * 1000)
        this._accessToken=val;
    },
}