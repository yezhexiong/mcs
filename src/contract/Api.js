/********************************
 * 相关后台调用接口定义
 ********************************/
export default {
    /**
     * 首页
     */
    Login: {
        login: '/UserAdminService/IsUserValid'
    },
    /**
     * 会诊
     */
    Consultation: {
        AddApply: '/OrderTreat/BPMConsulApplyMaster',//创建会诊申请单
        DraftApply:'/OrderTreat/BPMConsulDraftApply',//草稿提交
        ApprovalApply: '/OrderTreat/ApprovalApply',//审核会诊申请单
        ApplyInfo: '/OrderTreat/BPMConsulApplyInfo',//获取详细信息
        ApplyList: '/OrderTreat/BPMGetConsultationApplyList',//获取我发起流程记录列表
        ApprovalList: '/OrderTreat/BPMGetConsultationApprovalList',//获取我发起流程记录列表
    },
    Patient:{
        GetInPatBasicInfo:'/PatientService/GetInPatBasicInfo',//查询在院病人的基本信息
    },
    /**
     * 公用
     */
    Common:{
        /**
         * 查询字典文件根据Code类别查询子项递归
         */
        GetWidgetDict:'/DictAdminService/GetWidgetDictSonRecursion',//查询字典文件根据Code类别查询子项递归
        SerchCodeConfig:'/DictAdminService/GetSerchCodeConfig',//根据字典标识获取字典文件
        GetCodeConfig:'/DictAdminService/GetCodeConfig',//根据字典标识获取字典文件
        GetStaffList:'/DoctorAdminService/GetStaffList',//查询工作人员信息
        
    }

    // 当然也可以用文件方式进行管理
    // import Goods from './api/goods.js';
    // Goods: Goods
}