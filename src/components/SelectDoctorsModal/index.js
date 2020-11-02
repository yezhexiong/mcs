/*
组件名称:选择会诊对象
作者：yezhexiong
API 
  visible.sync 窗体是否显示
  ConsultationType:String,//会诊类型 2=普通-平会诊 1=普通-急会诊 3=MDT会诊

事件 
 confirmImport 确认导入回调事件

 <select-assay-modal
   ref="selectAssayModal"
   :visible.sync="selectAssayVisible"
   @confirmImport="handlerConfirmImportDoctors"
 />
*/
import selectDoctorsModal from './thisModal'
import './thisStyle.less'

selectDoctorsModal.install = function (Vue) {
  Vue.component('select-doctors-modal', selectDoctorsModal)//全局注册
}

export default selectDoctorsModal
