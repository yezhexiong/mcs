<template>
  <div class="testbox">
     name: {{name}} 
     <a-button type="primary" @click="callfather">
      Primary
    </a-button>
     <br>
      $attrs.name: {{$attrs.name}}
      <a-button type="dashed">
        Dashed
      </a-button>
     <br>
      $props.name: {{$props.name}}
     <br>
     $attrs:{{$attrs}}
     <br>
     $props:{{$props}}
     <br>
     $listeners{{$listeners}}
  </div>
</template>
<script>
// import {eventBus} from './thisEventBus'
// eventBus.$on('api-call',(param)=>{ console.log(param) });

export default {
  components: {
  },
  props: {//组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
    name:String,
  },
  data() {
      return {
      };
  },
  methods: {
    callfather(){
      // eventBus.$emit('i-got-clicked', 'yezhexiong');
    }
  },
  mounted() {
    // this.$emit('onTest');
  }

};
</script>

<style scoped>
.testbox{border:solid 1px red; height:130px;width: 510px;}
</style>
