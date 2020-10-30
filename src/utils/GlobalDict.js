/********************************
 * 相关公用全局字典
 ********************************/

import storage from 'store'
import http from './Http'
import api from '../contract/Api'//后端接口地址约定
import { CACHE_DICT_PREFIX } from '@/contract/Const'


/**
 * 字典表帮助
 */
class dictHelper {
    constructor(dictCategory) {
        this.dictCategory = dictCategory
        this.dicts = []
        this.cachepPrefix = CACHE_DICT_PREFIX //字典缓存前缀
        console.log('实例化dictHelper->',dictCategory)
        /**
         * 加载字典表数据
         */
        this.LoadDict = function () {
            const postParams = {
                "dict_pid": 0,
                "dict_type": "string",
                "dict_code": this.dictCategory,
                "dict_sort": 0,
                "dict_status": 1
            }
            let tmpList = http.Post(api.Common.GetWidgetDict, postParams) //
            console.log('this.LoadDict = function ('+this.dictCategory+') { => tmpList=',tmpList)
            tmpList = tmpList.map(item=>{
                return {
                    value:item.dict_code,//antd select 控件默认 options是value和label，可以直接绑定  【https://www.antdv.com/components/select-cn/ => options】
                    label:item.dict_comment,
                    ...item
                }
            })
            this.dicts = tmpList
            storage.set(this.cachepPrefix + this.dictCategory, this.dicts, 7 * 24 * 60 * 60 * 1000)
        }
        /**
         * 获取字典
         */
        this.GetDict = function () {
            console.log('获取字典:',this.dictCategory)
            if (typeof (this.dicts) == 'undefined' || this.dicts.length === 0) {
                this.dicts = storage.get(this.cachepPrefix + this.dictCategory)
            }
            if (typeof (this.dicts) == 'undefined' || this.dicts.length === 0) {
                this.LoadDict()
            }
            return this.dicts
        }
        /**
         * 格式化会诊状态
         * @param key 字典key
         * @returns {string}
         */
        this.FormatDict = function (key) {
            let dict = this.GetDict()
            if (typeof (dict) == 'undefined' || dict === 0) {
                for (let index in dict) {
                    let e = dict[index]
                    if (e.dict_code === key + '') {
                        return e.dict_value
                    }
                }
            }
            return ""
        }
        /**
         * 删除字典表数据
         * @returns {void}
         */
        this.RemoveDict = function () {
            this.dicts = []
            storage.remove(this.cachepPrefix + this.dictCategory)
        }
    }
}

const globalDict = {
    /**
     * 会诊相关字典
     */
    Consultation:{
        /** 会诊状态 */
        ApprovalStatus:{
            _dictApprovalStatus : [],
            /**
             * 获取字典
             */
            GetDict(){
                if (typeof (this._dictApprovalStatus) == 'undefined' || this._dictApprovalStatus.length === 0) {
                    this.LoadDict()
                }
                return this._dictApprovalStatus
            },
            /**
             * 格式化
             * @param key 字典key
             * @returns {string}
             */
            FormatDict(key){
                if(this._dictApprovalStatus.length === 0){
                    this.GetDict()
                }
                let dict = this._dictApprovalStatus
                for (let index in dict) {
                    let e = dict[index]
                    if(e.key == key){
                        return e.value;
                    }
                }
            },
            /**
             * 加载字典
             */
            LoadDict(){
                this._dictApprovalStatus = [
                    {"key":"99","value":"所有"},
                    {"key":"10","value":"取消会诊"},
                    {"key":"0","value":"驳回申请"},
                    {"key":"1","value":"审批中"},
                    {"key":"2","value":"草稿"},
                    {"key":"13","value":"申请中"},
                    {"key":"14","value":"审核通过"},
                    {"key":"15","value":"完成会诊"},
                    {"key":"16","value":"会诊中(已接收)"},
                ]
            },
            /**
             * 删除字典
             */
            RemoveDict(){
                this._dictApprovalStatus = []
            }
        },
        /** 会诊类型 */
        ConsultationType:new dictHelper("Consultation_Type"),
        /** 会诊目的 */
        ConsultationPurpose:new dictHelper("Purpose_Onsultation"),
    },
    /** 肿瘤分期 */
    TumorStaging:{
        /** 分期方法 */
        StagingMethod:new dictHelper("Staging_Method"),
       
        /** 类别 */
        ClassificationStages:new dictHelper("Classification_Stages"),
        
        /** 原发肿瘤 */
        PrimaryTumor:new dictHelper("Primary_Tumor"),
        
        /** 淋巴结转移 */
        LymphMetastasis:new dictHelper("Lymph_Metastasis"),
        
        /** 远处转移 */
        DistantMetastasis:new dictHelper("Distant_Metastasis"),
        
        /** 分期 */
        ByStages:new dictHelper("By_Stages"),        
    }, 
}

export {
    dictHelper,
    globalDict
}