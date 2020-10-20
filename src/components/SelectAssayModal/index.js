import selectAssayModal from './thisModal'
//import {eventBus} from './thisEventBus'
import './thisStyle.less'

selectAssayModal.install = function (Vue) {
  Vue.component('select-assay-modal', selectAssayModal)
}

export default selectAssayModal
