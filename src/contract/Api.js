/********************************
 * 相关后台调用接口定义
 ********************************/
export default {
    // 首页
    Login: {
        login: '/UserAdminService/IsUserValid'
    },
    // 会诊
    Consultation: {
        ApplyList: '/OrderTreat/BPMGetConsultationApplyList',//会诊事情列表
    },

    // 当然也可以用文件方式进行管理
    // import Goods from './api/goods.js';
    // Goods: Goods
}