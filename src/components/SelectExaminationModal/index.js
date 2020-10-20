import thisModal from './thisModal'
import {eventBus} from './eventBus'
import './thisStyle.less'

const api = {
  /**
   * open new tab on route fullPath
   * @param config
   */
  open: function (config) {
    alert('测试方法selectexaminationModal.open')
    eventBus.$emit('open', config)
  },
}

thisModal.install = function (Vue) {
  if (Vue.prototype.$SelectExaminationModal) {
    return
  }
  api.instance = eventBus
  Vue.prototype.$SelectExaminationModal = api
  Vue.component('select-examination-modal', thisModal)
}

export default thisModal
