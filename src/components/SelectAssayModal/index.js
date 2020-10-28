/*
 组件名称:检验导入组件
 作者：yezhexiong
 API 
  visible.sync 窗体是否显示 必须
  patientId 病人主键 必须
  patientName 病人名称 可选
 事件 
  confirmImport 确认导入回调事件

  <select-assay-modal
    ref="selectAssayModal"
    :visible.sync="selectAssayVisible"
    :patientId="patientid"
    :patientName="patientName"
    @confirmImport="handlerConfirmImportAssay"
  />
*/
import selectAssayModal from './thisModal'
import './thisStyle.less'

selectAssayModal.install = function (Vue) {
  Vue.component('select-assay-modal', selectAssayModal)//全局注册
}

export default selectAssayModal
