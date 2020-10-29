<template>
  <div id="index_tabs">
    <a-tabs @tabClick="tabClick">
      <a-tab-pane key="apply-list" tab="发起会诊">
        <apply-list :queryParam="applyQueryParam" ref="apply_table"></apply-list>
      </a-tab-pane>
      <a-tab-pane key="approval-list" tab="审核会诊">
        <approval-list :queryParam="approvalQueryParam" ref="approval_list"></approval-list>
      </a-tab-pane>
      <a-tab-pane key="draft-list" tab="我的草稿">
        <draft-list :queryParam="draftQueryParam" ref="draft_list" />
      </a-tab-pane>
      <div slot="tabBarExtraContent" style="margin-top: 2px">
        <a-form-model layout="inline">
          <div v-if="curlTab==='apply-list'">
            <a-form-model-item label="会诊时间:">
              <a-range-picker :style="{width:'200px'}" v-model="applyQueryParam.applyDateRegion"/>
            </a-form-model-item>
            <a-form-model-item label="范围">
              <a-select default-value="99" placeholder="请选择" :style="{width:'100px'}" v-model="applyQueryParam.approvaltype">
                <a-select-option value="99">全部</a-select-option>
                <a-select-option value="1">本人发起</a-select-option>
                <a-select-option value="2">本科室发起</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="类型">
              <a-select default-value="99" :style="{width:'100px'}" placeholder="请选择" v-model="applyQueryParam.consultationtype">
                <a-select-option value="99">全部</a-select-option>
                <a-select-option value="2">平会诊</a-select-option>
                <a-select-option value="1">急会诊</a-select-option>
                <a-select-option value="3">MDT会诊</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="状态">
              <a-select default-value="99" :style="{width:'100px'}" placeholder="请选择" v-model="applyQueryParam.approvalstatus">
                <!-- 流程状态 99:所有，10：取消会诊，11：驳回申请，0：退回，1:激活，2：完成，3：终止,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收) -->
                <a-select-option value="99">全部</a-select-option>
                <a-select-option value="2">暂存</a-select-option>
                <a-select-option value="16">会诊中</a-select-option>
                <a-select-option value="14">审核通过</a-select-option>
                <a-select-option value="15">已完成</a-select-option>
                <a-select-option value="10">作废</a-select-option>
                <a-select-option value="11">审核驳回</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" icon="plus" style="margin-left: 8px" @click="openEditForm">新建(测试入口)</a-button>
            </a-form-model-item>
          </div>
          <div v-if="curlTab==='approval-list'">
            <a-form-model-item label="会诊时间:">
              <a-range-picker :style="{width:'200px'}" v-model="approvalQueryParam.applyDateRegion"/>
            </a-form-model-item>
            <a-form-model-item label="范围">
              <a-select default-value="99" placeholder="请选择" :style="{width:'100px'}" v-model="approvalQueryParam.approvaltype">
                <a-select-option value="99">全部</a-select-option>
                <a-select-option value="1">本人发起</a-select-option>
                <a-select-option value="2">本科室发起</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="类型">
              <a-select default-value="99" :style="{width:'100px'}" placeholder="请选择" v-model="approvalQueryParam.consultationtype">
                <a-select-option value="99">全部</a-select-option>
                <a-select-option value="2">平会诊</a-select-option>
                <a-select-option value="1">急会诊</a-select-option>
                <a-select-option value="3">MDT会诊</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="状态">
              <a-select default-value="99" :style="{width:'100px'}" placeholder="请选择" v-model="approvalQueryParam.approvalstatus">
                <!-- 流程状态 99:所有，10：取消会诊，11：驳回申请，0：退回，1:激活，2：完成，3：终止,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收) -->
                <a-select-option value="99">全部</a-select-option>
                <a-select-option value="2">暂存</a-select-option>
                <a-select-option value="16">会诊中</a-select-option>
                <a-select-option value="14">审核通过</a-select-option>
                <a-select-option value="15">已完成</a-select-option>
                <a-select-option value="10">作废</a-select-option>
                <a-select-option value="11">审核驳回</a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
          <div v-if="curlTab==='draft-list'">
            <a-form-model-item label="会诊时间:">
              <a-range-picker :style="{width:'200px'}" v-model="draftQueryParam.applyDateRegion"/>
            </a-form-model-item>
            <a-form-model-item label="类型">
              <a-select default-value="99" :style="{width:'100px'}" placeholder="请选择" v-model="draftQueryParam.patStatus">
                <a-select-option value="99">全部</a-select-option>
                <a-select-option value="1">已申请</a-select-option>
                <a-select-option value="2">草稿要重新发起流程</a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
        </a-form-model>
      </div>
    </a-tabs>
  </div>
</template>
<script>
import ApplyList from '@/views/Consultation/ApplyList'
import ApprovalList from '@/views/Consultation/ApprovalList'
import DraftList from '@/views/Consultation/DraftList'
export default {
  components: {
    ApplyList,
    ApprovalList,
    DraftList,
  },
  methods: {
    tabClick(key){
      this.curlTab=key;
      switch(key){
        case "apply-list":{ this.applyQueryParam.refreshTime = new Date(); break}//通过更新参数（任意参数）来刷新列表
        case "approval-list":{ this.approvalQueryParam.refreshTime = new Date(); break}
        case "draft-list":{ this.draftQueryParam.refreshTime = new Date(); break}
        
      }
    },
    openEditForm(){
      // let param = {
      //   "strpatientid": "string",
      //   "strwardcode": "string",
      //   "nbedno": 0,
      //   "strvisitid": "string",
      //   "strdeptcode": "string"
      // }
      let param = {
        "strpatientid": "T620020527",
        "strvisitid": "2060358",
      }
      this.$Http.AsyncPost(this.$Api.Patient.GetInPatBasicInfo,param).then(res => {
        let formInitData = {
          isCreat:true,//是否创建
          patientId:res.data.patientid,//患者主键
          patientName:res.data.name,//患者姓名
          patientVisitId:res.data.visitid,//就诊主键
          patientDiagnosis:res.data.diagnosis,//患者主诊断
          // applydoctor:this.$GlobalData.LoginUserInfo.username,
        }
        console.log('formInitData=',formInitData)
        this.$refs.apply_table.openEditForm(formInitData)
      })
    },
    // function(dates: [moment, moment] | [string, string], dateStrings: [string, string])
    // dateRegionChange(dates, dateStrings){
    //   console.log('dates='+dates)
    //   console.log('dateStrings='+dateStrings)
    // },
  },
  data(){
    return {
      applyQueryParam: {// 发起会诊查询参数
        "applyDateRegion":[this.$GlobalFunc.moment().subtract(1, 'weeks'),this.$GlobalFunc.moment().endOf('day')],//此字段接口不需要，是控件需要，接口所需参数是starttime,endtime，在后面处理        
        "approvalstatus":"99",//流程状态 99:所有，10：取消会诊，11：驳回申请，0：退回，1:激活，2：完成，3：终止,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收)
        "approvaltype":"99",//会诊范围99:所有1=本人发起，2=本科室发起
        "consultationtype":"99",//会诊类型99:所有 1=急，2=普通会诊，3=MDT会诊
        "apprrovaldept":"2022",//课室
        "apprrovaluser":this.$GlobalData.LoginUserInfo.dbuser,//审批用户
        "refreshTime":"",
      },
      approvalQueryParam: {// 审核会诊查询参数
        "applyDateRegion":[this.$GlobalFunc.moment().subtract(1, 'weeks'),this.$GlobalFunc.moment().endOf('day')],//此字段接口不需要，是控件需要，接口所需参数是starttime,endtime，在后面处理        
        "consultationtype":"99",//会诊类型99:所有 1=急，2=普通会诊，3=MDT会诊
        "approvalstatus":"99",//流程状态 99:所有，10：取消会诊，11：驳回申请，0：退回，1:激活，2：完成，3：终止,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收)
        "apprrovaldept":"2022",//课室 
        "approvaltype":"99",//会诊范围99:所有1=本人发起，2=本科室发起
        "apprrovaluser":this.$GlobalData.LoginUserInfo.dbuser,//审批用户
        "refreshTime":"",
      },
      draftQueryParam: {// 审核会诊查询参数
        "applyDateRegion":[this.$GlobalFunc.moment().subtract(1, 'weeks'),this.$GlobalFunc.moment().endOf('day')],//此字段接口不需要，是控件需要，接口所需参数是starttime,endtime，在后面处理        
        "applyuser":this.$GlobalData.LoginUserInfo.dbuser,//申请用户
        "patStatus":1,//1已申请，2草稿流程,草稿要重新发起流程
        "refreshTime":"",
      },
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
