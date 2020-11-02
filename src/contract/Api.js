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
        ApprovalList: '/OrderTreat/BPMGetConsultationApprovalList',//获取我审批记录列表
        DraftList: '/OrderTreat/BPMGetConsultationStatusList',//获取草稿的列表
        CommentList:'/OrderTreat/BPMApprovalCommentList',//查询会诊意见和评价
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
        GetWidgetDict:'/DictAdminService/GetWidgetDictSon',//查询字典文件根据Code类别查询子项递归 
        GetWidgetDictRecursion:'/DictAdminService/GetWidgetDictSonRecursion',//查询字典文件根据Code类别查询子项递归 
        SerchCodeConfig:'/DictAdminService/GetSerchCodeConfig',//根据字典标识获取字典文件
        GetCodeConfig:'/DictAdminService/GetCodeConfig',//根据字典标识获取字典文件
        GetStaffList:'/DoctorAdminService/GetStaffList',//查询工作人员信息
        GetLabTestItem:'/LabTestService/GetLabTestAlready',//获取病人已经检验项目
        GetLabTestItemInfo:'/LabTestService/GetPatCpoeTestResultList',//获取病人已经检验项目明细
        GetExamReport:'/ExamService/GetCpoeExamReportList',//获取病人检查项目结果数据
        GetExpertList:'/DictAdminService/GetWidgetExpertList',//获取专家组集
        GetExpertDetail:'/DictAdminService/GetWidgetExpertUserList',//获取专家组详细
    }

    // 当然也可以用文件方式进行管理
    // import Goods from './api/goods.js';
    // Goods: Goods
}