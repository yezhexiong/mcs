<template>
  <div id="index_tabs">
    <a-tabs @tabClick="tabClick">
      <a-tab-pane key="apply-list" tab="发起会诊">
        <apply-list :queryParam="applyQueryParam" ref="apply_table"></apply-list>
      </a-tab-pane>
      <a-tab-pane key="check-list" tab="审核会诊">
        <check-list ref="check_list"></check-list>
      </a-tab-pane>
      <a-tab-pane key="3" tab="应邀会诊">
        <test-list ref="test_list" />
      </a-tab-pane>
      <div slot="tabBarExtraContent" style="margin-top: 2px">
        <a-form-model layout="inline">
          <a-form-model-item label="会诊时间:">
            <a-range-picker :style="{width:'200px'}" @change="dateRegionChange" v-model="applyQueryParam.applyDateRegion"/>
          </a-form-model-item>
          <a-form-item label="范围">
            <a-select default-value="99" placeholder="请选择" :style="{width:'100px'}" v-model="applyQueryParam.approvaltype">
              <a-select-option value="99">全部</a-select-option>
              <a-select-option value="1">本人发起</a-select-option>
              <a-select-option value="2">本科室发起</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="类型">
            <a-select default-value="99" :style="{width:'100px'}" placeholder="请选择" v-model="applyQueryParam.consultationtype">
              <a-select-option value="99">全部</a-select-option>
              <a-select-option value="2">平会诊</a-select-option>
              <a-select-option value="1">急会诊</a-select-option>
              <a-select-option value="3">MDT会诊</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="状态">
            <a-select default-value="99" :style="{width:'100px'}" placeholder="请选择" v-model="applyQueryParam.approvalstatus">
              <a-select-option value="99">全部</a-select-option>
              <a-select-option value="0">驳回事情</a-select-option>
              <a-select-option value="1">审批中</a-select-option>
              <a-select-option value="2">草稿</a-select-option>
              <a-select-option value="10">取消会诊</a-select-option>
              <a-select-option value="13">申请中</a-select-option>
              <a-select-option value="14">审核通过</a-select-option>
              <a-select-option value="15">完成会诊</a-select-option>
              <a-select-option value="16">会诊中(已接收)</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-model-item>
            <div v-if="curlTab==='apply-list'">
              <a-button type="primary" icon="plus" style="margin-left: 8px" @click="openCreateModal">新建</a-button>
            </div>
            <div v-if="curlTab==='check-list'">
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-tabs>
  </div>
</template>
<script>
import ApplyList from '@/views/Consultation/Apply'
import CheckList from '@/views/Consultation/Check'
import TestList from '@/views/Consultation/Test'
export default {
  components: {
    ApplyList,
    CheckList,
    TestList,
  },
  methods: {
    //打开创建会诊对话框
    openCreateModal2:() => {
      this.$refs.apply_table.openEditForm();
    },
    tabClick(key){
      this.curlTab=key;
    },
    openCreateModal(){
      this.$refs.apply_table.openEditForm();
    },
    // function(dates: [moment, moment] | [string, string], dateStrings: [string, string])
    dateRegionChange(dates, dateStrings){
      console.log('dates='+dates)
      console.log('dateStrings='+dateStrings)
    },
  },
  data(){
    return {
      applyQueryParam: {
        "applyDateRegion":[this.$GlobalFunc.moment().subtract(1, 'weeks'),this.$GlobalFunc.moment().endOf('day')],//此字段接口不需要，是控件需要，接口所需参数是starttime,endtime，在后面处理        
        "approvalstatus":"99",//99:所有，10：取消会诊，0：驳回申请，1：审批中；2：草稿,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收)
        "approvaltype":"99",//会诊范围99:所有1=本人发起，2=本科室发起
        "consultationtype":"99",//会诊类型99:所有 1=急，2=普通会诊，3=MDT会诊
        "apprrovaldept":"2022",//课室        
      },// 查询参数
      curlTab:"apply-list",//当前tab页面
    }
  }
}
</script>
<style>
#index_tabs .ant-tabs-bar {
    background: #DFF4FA;
    margin:0;
    overflow: hidden;
}

#index_tabs .ant-tabs-ink-bar {
    height: 3px;
    background-color: #08979C;
}
</style>
