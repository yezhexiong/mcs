<template>
  <div>
      <!-- 
      :visible="visible" 是否显示
      centered 垂直居中显示
      :footer="null" 不显示底部按钮 
    -->
    <a-modal 
      :visible="visible" 
      :title="title" 
      centered
      width="900px" 
      cancel-text="取消"
      @cancel="closeModal"
      ok-text="确认导入"
      @ok="confirmImport"
    >
    <this-transfer />
    </a-modal>
  </div>
</template>
<script>
import thisTransfer from './thisTransfer.vue'

export default {
    components: {
        thisTransfer,
    },
    props: {//组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
        visible:Boolean,//a-modal 是否显示
    },
    data() {
        return {
            title:'检验选择对话框',
        };
    },
  methods: {
    closeModal() {//关闭对话框
      this.$emit('update:visible',false); //父组件里通过.sync的props变量，才能通过次方式进行修改 这里是:visible.sync
    },
    confirmImport() {//确认导入
      this.closeModal();
    },
  },
};
</script>
