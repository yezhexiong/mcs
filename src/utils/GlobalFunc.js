/********************************
 * 相关公用全局方法
 ********************************/

const globalFunc = {
    /**
     * js获取url传递指定参数,解决url中带中文乱码的问题(根据key获取value)
     * @param key
     * @returns {string|null}
     */
    getQueryString:(key) => {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return decodeURI(r[2]); return null;
    },
    /**
     * 封装数据
     * @param data 数据对象(用于添加修改)部分可用
     */
    packData:(data) => {
        var vmData={};
        for (var o in data) {
            if (data[o] !== null && data[o] instanceof Array)
                vmData[o]=null;
            else{
                if(typeof data[o] === 'string' && data[o].length > 0)
                    vmData[o]=data[o].trim();
                else
                    vmData[o]=data[o];
            }
        }
        return vmData;
    },
    /**
     * 动态赋值（用于查看编辑）
     * @param orgObj
     * @param newObj
     * @returns {*}
     * @constructor fg 2019年6月12日
     */
    AssignmentObject:(orgObj, newObj) => {
        for (var o in orgObj) {
            if (!(orgObj[o] !== null && orgObj[o] instanceof Array))
            {
                for (var n in newObj){
                    if(o==n){
                        orgObj[o]=newObj[n];
                        break;
                    }
                }
            }
        }
        return orgObj;
    },
    /**
     * 按钮重置内容
     * @param data
     */
    clearContent:(data) => {
        var v_data = {};
        for (var o in data) {
            if (data[o] !== null && data[o] instanceof Array)
                v_data[o] = data[o];
            else {
                v_data[o] = null;
            }
        }
        return v_data;
    },
    /**
     * 内部引用 校验值是否为空
     * @param value
     * @returns {boolean}
     */
    isCheck:(value) => {
        value = value.trim();
        if (value === null || value === '' || value === 'undefined')
            return true;
        return false;
    },
}

import moment from 'moment'
globalFunc.moment = moment;//moment 插件

export default globalFunc
