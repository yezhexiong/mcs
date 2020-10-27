/********************************
 * 相关公用全局数据
 ********************************/

import storage from 'store'
import http from './Http'
import api from '../contract/Api'//后端接口地址约定
import { LOGIN_USER_INFO, ACCESS_TOKEN, CACHE_GLOBAL_PREFIX } from '@/contract/Const'


export default {
    _loginUserInfo: null,//实际上也是能访问，人为约定外部不能访问
    /**
     * 获取登录用户信息
     */
    get LoginUserInfo() {
        if (this._loginUserInfo === null) {
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
    set LoginUserInfo(val) {
        storage.set(LOGIN_USER_INFO, val, 7 * 24 * 60 * 60 * 1000)
        this._loginUserInfo = val;
    },

    _accessToken: "",
    /**
     * 获取范围令牌
     */
    get AccessToken() {
        if (this._accessToken === "") {
            this._accessToken = storage.get(ACCESS_TOKEN);
        }
        return this._accessToken;
    },
    /**
     * 设置范围令牌
     */
    set AccessToken(val) {
        storage.set(ACCESS_TOKEN, val, 7 * 24 * 60 * 60 * 1000)
        this._accessToken = val;
    },

    _doctors: [],
    /**
     * 获取所有科室医生(异步)
     */
    async GetAllDoctors() {
        if (typeof (this._doctors) == 'undefined' || this._doctors.length === 0) {
            this._doctors = storage.get(CACHE_GLOBAL_PREFIX + 'Doctors')
        }
        if (typeof (this._doctors) == 'undefined' || this._doctors.length === 0) {
            let url = api.Common.GetStaffList;
            let groups = []
            let offices = await this.GetOffices()
            offices.forEach(element => {
                groups.push(element.itemcode)
            });
            console.log('groups=', groups)
            let param = {
                GroupClass: null,
                ListGroupCode: groups,
                ListDeptCodeExclude: [],
                Title: null,
                HospitalCode: "1000000",
                ValidIndicator: null,
                IsError: false,
                ErrMessage: null,
            };
            let res = await http.AsyncPost(url, param)
            let list = res.data;
            if (typeof (list) == "undefined") {
                this.$message.error('未找到任何医生，请联系管理员')
                return []
            }

            storage.set(CACHE_GLOBAL_PREFIX + 'Doctors', list, 7 * 24 * 60 * 60 * 1000)
            this._doctors = list
        }
        return this._doctors
    },
    /**
     * 获取科室医生(分页)
     * @param {pagination} pagination 
     */
    async GetDoctorsInPage(pagination={pageSize: 15,current:1,total:0}, searchKey='') {
        let list = await this.GetAllDoctors()
        let tmpList = []
        if(searchKey === ''){
            tmpList = list
        }else{
            tmpList = list.filter((item) => {//模糊搜索
                if (item.name.indexOf(searchKey) > -1 || item.inputcode.indexOf(searchKey) > -1) {
                    return true;
                }
            });
        }
        if(tmpList.length === 0){
            return {
                total: 0,
                data: []
            }
        }
        let start = (pagination.current - 1) * pagination.pageSize
        let end = start + pagination.pageSize
        if(end>tmpList.length) {end =tmpList.length}
        console.log('start=',start)
        console.log('end=',end)
        return {
            total: tmpList.length,
            data: tmpList.slice(start, end)
        }
    },
    _offices: [],
    /**
     * 获取所有科室(异步)
     */
    async GetOffices() {
        if (typeof (this._offices) == 'undefined' || this._offices.length === 0) {
            this._offices = storage.get(CACHE_GLOBAL_PREFIX + 'Offices')
        }
        if (typeof (this._offices) == 'undefined' || this._offices.length === 0) {
            let url = api.Common.GetCodeConfig;
            let param = 300;
            let res = await http.AsyncPost(url, param);
            let list = res.data.clslistiteminfo;
            if (typeof (list) == "undefined") {
                this.$message.error('未找到任何科室，请联系管理员')
                return []
            }
            storage.set(CACHE_GLOBAL_PREFIX + 'Offices', list, 7 * 24 * 60 * 60 * 1000)
            this._offices = list;
        }
        return this._offices
    },
    /**
     * 获取科室(分页)
     * @param {pagination} pagination 
     */
    async GetOfficesInPage(pagination={pageSize: 15,current:1,total:0}, searchKey='') {
        let list = await this.GetOffices()
        let tmpList = []
        if(searchKey === ''){
            tmpList = list
        }else{
            tmpList = list.filter((item) => {//模糊搜索
                if (item.itemname.indexOf(searchKey) > -1 || item.inputcode.indexOf(searchKey) > -1) {
                    return true;
                }
            });
        }
        if(tmpList.length === 0){
            return {
                total: 0,
                data: []
            }
        }
        let start = (pagination.current - 1) * pagination.pageSize
        let end = start + pagination.pageSize
        if(end>tmpList.length) {end =tmpList.length}
        console.log('start=',start)
        console.log('end=',end)
        return {
            total: tmpList.length,
            data: tmpList.slice(start, end)
        }
    },
}