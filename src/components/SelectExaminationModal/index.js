/*
 组件名称:检查导入组件
 作者：yezhexiong
 API 
  visible.sync 窗体是否显示 必须
  patientId 病人主键 必须
  patientName 病人名称 可选
 事件 
  confirmImport 确认导入回调事件

  <select-examination-modal
    ref="selectExaminationModal"
    :visible.sync="selectExaminationVisible"
    :patientId="patientid"
    :patientName="patientName"
    @confirmImport="handlerConfirmImportExamination"
  />
*/
import selectExaminationModal from './thisModal'
import './thisStyle.less'

selectExaminationModal.install = function (Vue) {
  Vue.component('select-examination-modal', selectExaminationModal)//全局注册
}

export default selectExaminationModal
