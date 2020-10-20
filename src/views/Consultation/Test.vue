<template>
  <div>
     <select-assay-modal name="yechenglang11"  sex="female" @onTest="onTest('1111')"/>
     <select-assay-modal name="yechenglang" age="120" cpi="1111111" v-on:onTest="onTest('222')"/>
     <select-assay-modal sex="female" :name="name" @onTest="onTest('3333')" :visible.sync="selectAssayModalVisible"/>
     <a-button type="primary" @click="callfather">
      hahah
    </a-button>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {//组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
  },
  data() {
    return {
        name:"yezhexiong",
        selectAssayModalVisible:false,
    };
  },
  methods: {
    onTest(param){
      console.log('你点击了我',param);
    },
    callfather(){
      this.selectAssayModalVisible=true;
    },
  },
};
</script>

<style scoped>
</style>
