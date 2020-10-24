/*
组件名称:检验导入组件
作者：yezhexiong
API 
 visible.sync 窗体是否显示
事件 
 confirmImport 确认导入回调事件

 <select-assay-modal
   ref="selectAssayModal"
   :visible.sync="selectAssayVisible"
   @confirmImport="handlerConfirmImportAssay"
 />
*/
import selectDoctorsModal from './thisModal'
import './thisStyle.less'

selectDoctorsModal.install = function (Vue) {
  Vue.component('select-Doctors-modal', selectDoctorsModal)//全局注册
}

export default selectDoctorsModal
