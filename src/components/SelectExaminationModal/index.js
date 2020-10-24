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
import selectExaminationModal from './thisModal'
import './thisStyle.less'

selectExaminationModal.install = function (Vue) {
  Vue.component('select-examination-modal', selectExaminationModal)//全局注册
}

export default selectExaminationModal
