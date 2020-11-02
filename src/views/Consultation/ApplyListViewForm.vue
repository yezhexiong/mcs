<template>
  <!-- 
      :visible="visible" 是否显示
      centered 垂直居中显示
      :footer="null" 不显示底部按钮 
    -->
  <div>
    <a-modal
      :visible="visible"
      :title="title+'['+formModel.pat_status+']'"
      centered
      width="1000px"
      @cancel="handlerCancel"
    >
      <!-- 对话框自定义按钮 -->
      <template slot="footer">
        <span v-if="formModel.pat_status === 11">
          <a-button
            key="btnReSend"
            type="primary"
            :loading="btnReSendLoading"
            @click="handlerReSend"
            >重新发起</a-button
          >
        </span>
        <span v-if="formModel.pat_status === 13">
          <a-button
            key="btnWithdraw"
            type="primary"
            :loading="btnWithdrawLoading"
            @click="handlerWithdraw"
            >撤销申请</a-button
          >
        </span> 
        <span v-if="formModel.pat_status === 15">
          <a-button
            key="btnDelete"
            type="primary"
            :loading="btnDeleteLoading"
            @click="handlerDelete"
            >删除</a-button
          >
        </span>
       
        <span v-if="formModel.pat_status === 13 || formModel.pat_status === 2 || formModel.pat_status === 16">
          <a-button key="btnPrint" @click="handlerPrint">打印</a-button>
        </span>
        <a-button key="btnClose" @click="handlerCancel">关闭</a-button>
      </template>
      <div>
        <a-row type="flex" justify="center" align="top">
          <a-col :span="13">
            <a-spin tip="Loading..." :spinning="formSpinning">
              <a-steps :current="1" size="small">
                <a-step title="会诊申请" />
                <a-step title="会诊审核" />
                <a-step title="接收会诊" />
                <a-step title="编辑会诊意见" />
                <a-step title="完成会诊" />
              </a-steps>
              <br />
              <a-descriptions title="患者信息" :column="1">
                <a-descriptions-item label="会诊患者">
                  {{ formModel.name }} | {{ formModel.patientid }} |
                  {{ formModel.visitid }}
                </a-descriptions-item>
                <a-descriptions-item label="患者病情">{{
                  formModel.memo
                }}</a-descriptions-item>
                <a-descriptions-item label="补充患者资料"
                  >1111</a-descriptions-item
                >
              </a-descriptions>
              <a-descriptions title="会诊信息">
                <a-descriptions-item label="会诊类型">
                  {{ formModel.consultationattr }}
                </a-descriptions-item>
                <a-descriptions-item label="会诊时间">
                  {{ formModel.applydate }}
                </a-descriptions-item>
                <a-descriptions-item label="会诊状态">
                  {{
                    $GlobalDict.Consultation.ApprovalStatus.FormatDict(
                      formModel.pat_status
                    )
                  }}
                </a-descriptions-item>
                <a-descriptions-item label="会诊诊断" :span="3">
                  {{ formModel.definitediagnosis }}</a-descriptions-item
                >
                <a-descriptions-item label="会诊目的" :span="3">
                  {{ formModel.consultationpurpose }}</a-descriptions-item
                >
                <a-descriptions-item label="会诊对象" :span="3">
                  <span
                    v-for="item in formModel.clsconsultationdetaillist"
                    :key="item.key"
                  >
                    <a-tag :key="item.key" @close="() => handleClose(item.key)">
                      {{ item.groupname + "(" + item.consultationdept + ")" }}
                    </a-tag>
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="申请医生">
                  {{ formModel.applydoctor }}</a-descriptions-item
                >
                <a-descriptions-item label="联系方式">{{
                  formModel.phone
                }}</a-descriptions-item>
              </a-descriptions>
              <div v-if="formModel.consultationattr === '3'">
                <a-descriptions title="肿瘤分期" :column="3">
                  <a-descriptions-item label="分期方法">{{
                    formModel.staging_method
                  }}</a-descriptions-item>
                  <a-descriptions-item label="类别">
                    {{ formModel.classification_stages }}</a-descriptions-item
                  >
                  <a-descriptions-item label="原发肿瘤">{{
                    formModel.primary_tumor
                  }}</a-descriptions-item>
                  <a-descriptions-item label="淋巴结转移">{{
                    formModel.lymph_metastasis
                  }}</a-descriptions-item>
                  <a-descriptions-item label="远处转移">{{
                    formModel.distant_metastasis
                  }}</a-descriptions-item>
                  <a-descriptions-item label="分期">{{
                    formModel.by_stages
                  }}</a-descriptions-item>
                </a-descriptions>
              </div>
            </a-spin>
          </a-col>
          <a-col :span="11">
            <view-form-comment
              :folio="initData.primaryKey"
            />
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>
<script>
import viewFormComment from '@/views/Consultation/ViewFormComment'
export default {
  components: {
    viewFormComment,
  },
  props: {
    //组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
    visible: Boolean, //a-modal 是否显示
    initData: {
      //初始值
      type: Object,
      default() {
        return {
          isCreat: false, //是否创建
          primaryKey: 0, //如果不是创建，则需要传递主键值
          patientId: "", //患者主键
          patientName: "叶哲雄", //患者姓名
          patientVisitId: "001", //就诊主键
          patientDiagnosis: "小感冒", //患者主诊断
        };
      },
    },
  },
  data() {
    return {
      //组件私有变量
      //Modal相关变量
      title: "创建会诊申请单",
      //FormModel相关变量

      btnSaveLoading: false,
      btnSendLoading: false,
      btnDraftApplyLoading: false,
      btnWithdrawLoading: false,
      btnReSendLoading: false,
      btnDeleteLoading: false,
      formSpinning: false, //表单加载状态

      labelCol: { span: 4 },
      labelCol2: { span: 8 },
      wrapperCol: { span: 14 },

      formModel: {},
    };
  },
  mounted() {
    //mounted 是生命周期方法之一，会在对应生命周期时执行。
  },
  computed: {
    // 计算属性的 getter
    selectedDoctorsKeys: function () {
      let list = [];
      if (
        typeof this.formModel.clsconsultationdetaillist !== "undefined" &&
        this.formModel.clsconsultationdetaillist != null
      ) {
        this.formModel.clsconsultationdetaillist.forEach((item) => {
          list.push({
            key: item.consultationdept,
          });
        });
      }
      return list;
    },
  },
  watch: {
    initData: {
      handler() {
        this.title = "查看会诊申请单详细";
        this.loadData();
      },
      deep: true, //监听对象时，需要开启
      // immediate: true, //启动首次监听
    },
  },
  methods: {
    initFormData() {
      this.formModel = {
        consultationpurpose: "",
        applydoctor: "",
        definitediagnosis: "",
        consultationattr: "2", //默认普通平会诊
        memo: "",
        phone: "",
        staging_method: "",
        clsconsultationdetaillist: [], //会诊对象集
        filelist: [], //上传文件列表
        applydate: null,
        pat_status: -1,
      };
    },
    loadData() {
      if (this.initData.primaryKey !== 0) {
        this.formSpinning = true;
        let url = this.$Api.Consultation.ApplyInfo +"?folio=" +this.initData.primaryKey;
        this.$Http.AsyncPost(url).then((res) => {
          this.formModel = res.data;
          this.formSpinning = false;
        });
      }
    },
    handlerCancel() {
      this.$emit("update:visible", false); //父组件里通过.sync的props变量，才能通过次方式进行修改 这里是:visible.sync
    },
    handlerDelete() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //验证成功
          this.btnDeleteLoading = true;
          this.formModel.pat_status = 2;
          this.$Http
            .AsyncPost(this.$Api.Consultation, this.formModel)
            .then((res) => {
              this.btnDeleteLoading = false;
              this.$message.info("删除成功");
              this.$emit("update:visible", false); //关闭对话框
              console.log(res);
            });
        } else {
          console.log("error onSave!!");
          return false;
        }
      });
    },
   
    handlerWithdraw() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //验证成功
          this.btnWithdrawLoading = true;
          this.formModel.pat_status = 2;
          this.$Http
            .AsyncPost(this.$Api.Consultation, this.formModel)
            .then((res) => {
              this.btnWithdrawLoading = false;
              this.$message.info("发送成功");
              this.$emit("update:visible", false); //关闭对话框
              console.log(res);
            });
        } else {
          console.log("error onSave!!");
          return false;
        }
      });
    },
    handlerReSend() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //验证成功
          this.btnReSendLoading = true;
          this.formModel.pat_status = 2;
          this.$Http
            .AsyncPost(this.$Api.Consultation, this.formModel)
            .then((res) => {
              this.btnReSendLoading = false;
              this.$message.info("发送成功");
              this.$emit("update:visible", false); //关闭对话框
              console.log(res);
            });
        } else {
          console.log("error onSave!!");
          return false;
        }
      });
    },
    handlerPrint() {
      console.log("print=");
      console.log("formModel=", this.formModel);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message.info("handlerPrint");
      }, 3000);
    },

    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },
  },
};
</script>
<style>
.ant-modal-footer button {
  margin-left: 8px;
}
.my_status_flag {
  background: #ccc;
  color: #08979c;
  font-weight: bold;
  float: right;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>