/********************************
 * 相关公用全局字典
 ********************************/

import storage from 'store'

var globalDict = () => {}

globalDict.prototype.Title = "1111";
globalDict.prototype.PrintTitle=function(param){ 
    console.log('param=',param)
    console.log('this.Title=',this.Title)
};

globalDict.prototype.Consultation = {
    _approvalStatuss : null,//会诊状态：99:所有，10：取消会诊，0：驳回申请，1：审批中；2：草稿,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收)
    /**
     * 格式化会诊状态
     */
    FormatApprovalStatus: function(val){
        if(this._approvalStatuss === null){
            console.log('this._approvalStatuss 为空，从缓存获取')
            this._approvalStatuss = storage.get("Consultation_approvalStatusList");
            if(typeof(this._approvalStatuss) == 'undefined'){
                console.log('this._approvalStatuss 还为空，执行字典导入方法')
                this.ImportApprovalStatus()
            }
        }
        let listCount = this._approvalStatuss.length
        for (var i = 0; i < listCount; i++) {
            let e = this._approvalStatuss[i]
            if(e.key === val+''){
                console.log('e.value=',e.value)
                return e.value;
            }
        }
    },
    /**
     * 导入会诊状态字典
     */
    ImportApprovalStatus:function(){
        let dic = [
                {"key":"99","value":"所有"},
                {"key":"10","value":"取消会诊"},
                {"key":"0","value":"驳回申请"},
                {"key":"1","value":"审批中"},
                {"key":"2","value":"草稿"},
                {"key":"13","value":"申请中"},
                {"key":"14","value":"审核通过"},
                {"key":"15","value":"完成会诊"},
                {"key":"16","value":"会诊中(已接收)"},
            ];
        storage.set("Consultation_approvalStatusList", dic, 7 * 24 * 60 * 60 * 1000)
        this._approvalStatuss=dic;
    },
}
export default new globalDict()
// export default {
//     //会诊相关
//     Consultation:{
//         _approvalStatuss : null,//会诊状态：99:所有，10：取消会诊，0：驳回申请，1：审批中；2：草稿,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收)
//         /**
//          * 格式化会诊状态
//          */
//         FormatApprovalStatus:(val) =>{
//             if(this._approvalStatuss === null){
//                 this._approvalStatuss = storage.get("Consultation_approvalStatusList");
//                 if(this._approvalStatuss === null){
//                     this.ImportApprovalStatus()
//                 }
//             }
//             this._approvalStatuss.forEach(e => {
//                 if(e === val)
//                 return e.Text;
//             });
//         },
//         /**
//          * 导入会诊状态字典
//          */
//         ImportApprovalStatus:()=>{
//             let dic = [
//                     {"key":"99","value":"所有"},
//                     {"key":"10","value":"取消会诊"},
//                     {"key":"0","value":"驳回申请"},
//                     {"key":"1","value":"审批中"},
//                     {"key":"2","value":"草稿"},
//                     {"key":"13","value":"申请中"},
//                     {"key":"14","value":"审核通过"},
//                     {"key":"15","value":"完成会诊"},
//                     {"key":"16","value":"会诊中(已接收)"},
//                 ];
//             storage.set("Consultation_approvalStatusList", dic, 7 * 24 * 60 * 60 * 1000)
//             this._approvalStatuss=dic;
//         },
//     },
// }