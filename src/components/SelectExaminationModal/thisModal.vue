
<template>
  <div>
    <!-- 
      :visible="visible" 是否显示
      centered 垂直居中显示
      :footer="null" 不显示底部按钮 
    -->
    <a-modal
      class="select-examination-modal"
      :visible="visible"
      :closable="false"
      centered
      width="850px"
      cancel-text="取消"
      @cancel="closeModal"
      ok-text="确认导入"
      @ok="confirmImport"
    >
      <this-content ref="selectExaminationContent" v-bind="$attrs" />
    </a-modal>
  </div>
</template>
<script>
import thisContent from "./thisContent";

export default {
  components: {
    thisContent,
  },
  props: {
    //组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
    visible: Boolean, //a-modal 是否显示
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    /** 关闭对话框 */
    closeModal() {
      this.$emit("update:visible", false); //父组件里通过.sync的props变量，才能通过次方式进行修改 这里是:visible.sync
    },
    /** 确认导入 */
    confirmImport() {
      this.$emit(
        "confirmImport",
        this.$refs.selectExaminationContent.selectedItems
      );
      this.closeModal();
    },
  },
};
</script>
