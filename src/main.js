import Vue from 'vue'
import Antd from 'ant-design-vue';
import storage from 'store'//浏览器本地存储方法插件

import App from './App.vue'
import api from '@/contract/Api'//后端接口地址约定
import http from '@/utils/Http';//ajax请求封装
import routers from '@/routers'//路由配置
import globalData from '@/utils/GlobalData';//全局公用数据
import globalDict from '@/utils/GlobalDict';//全局公用数据
import globalFunc from '@/utils/GlobalFunc';//全局公用方法
import '@/utils/GlobalExtension';//注册相关全局扩展方法(扩展js原生对象)

//import "ant-design-vue/dist/antd.css";
import './styles.less'


// 引入自定义常用组件并全局注册
import selectAssayModal from '@/components/SelectAssayModal'//选择检查对话框
Vue.use(selectAssayModal);//注册代码在控件的install方法里 Vue.component('select-assay-modal', selectAssayModal)
import selectExaminationModal from '@/components/SelectExaminationModal'//选择检查对话框
Vue.use(selectExaminationModal);//注册代码在控件的install方法里 Vue.component('select-assay-modal', selectAssayModal)
Vue.use(Antd);

//Vue.prototype.$EventBus = new Vue() //全局事件总线，有需要再开启

Vue.config.productionTip = false


/* 相关全局注册，方便使用 */
Vue.prototype.$storage = storage;
Vue.prototype.$Api = api;// 对后端接口 进行全局注册
Vue.prototype.$Http = http;//http 使用方式this.$Http
Vue.prototype.$GlobalData = globalData
Vue.prototype.$GlobalDict = globalDict
Vue.prototype.$GlobalFunc = globalFunc

new Vue({
  router:routers,
  render: h => h(App),
}).$mount('#app')
