<template>
  <!-- 
      :visible="visible" 是否显示
      centered 垂直居中显示
      :footer="null" 不显示底部按钮 
    -->
  <div>
    <a-modal
      :visible="visible"
      :title="title"
      centered
      width="900px"
      @cancel="handlerCancel"
    >
      <!-- 对话框自定义按钮 -->
      <template slot="footer">
        <!-- pat_status 流程状态 99:所有，10：取消会诊，11：驳回申请，0：退回，1:激活，2：完成，3：终止,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收) -->
        <span v-if="formModel.pat_status === 15 || formModel.pat_status === -1">
          <a-button
            key="btnSend"
            type="primary"
            :loading="btnSendLoading"
            @click="handlerSend"
            >发送(直接)</a-button
          >
        </span>
        <span v-if="formModel.pat_status === 15">
          <a-button
            key="btnDraftApply"
            type="primary"
            :loading="btnDraftApplyLoading"
            @click="handlerDraftApply"
            >发送(从草稿)</a-button
          >
        </span>
        <span v-if="formModel.pat_status === 11">
          <a-button
            key="btnReSend"
            type="primary"
            :loading="btnReSendLoading"
            @click="handlerReSend"
            >重新发起</a-button
          >
        </span>
        <span v-if="formModel.pat_status === 15 || formModel.pat_status === -1">
          <a-button
            key="btnSave"
            type="primary"
            :loading="btnSaveLoading"
            @click="handlerSave"
            >暂存</a-button
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
        <span v-if="formModel.pat_status === 16 || formModel.pat_status === 14">
          <a-button key="btnPrint" @click="handlerPrint">打印</a-button>
        </span>
        <a-button key="btnClose" @click="handlerCancel">关闭</a-button>
      </template>
      <a-spin tip="Loading..." :spinning="formSpinning">
        <!-- 
          ref="editForm"  组件引用 可this.$refs.editForm调用组件相关资源
          :model="formModel" 表单数据对象
          :rules="rules"  表单验证规则
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        -->
        <a-form-model
          ref="editForm"
          :model="formModel"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          a:{{ formModel.pat_status }}
          <div class="my_status_flag">
            {{
              $GlobalDict.Consultation.ApprovalStatus.FormatDict(
                formModel.pat_status
              )
            }}
          </div>
          <a-form-model-item label="会诊患者">
            姓名:{{ formModel.name }} 编号:{{ formModel.patientid }} 就诊号:{{
              formModel.visitid
            }}
          </a-form-model-item>
          <a-form-model-item ref="consultationattr" label="会诊类型" required>
            <a-radio-group
              default-value="2"
              button-style="solid"
              v-model="formModel.consultationattr"
            >
              <a-radio-button value="2"> 普通-平会诊 </a-radio-button>
              <a-radio-button value="1"> 普通-急会诊 </a-radio-button>
              <a-radio-button value="3"> MDT会诊 </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="会诊时间" prop="applydate">
            {{formModel.applydate}}
          </a-form-model-item>
          <a-form-model-item label="会诊目的">
            {{formModel.consultationpurpose}}
          </a-form-model-item>
          <a-form-model-item
            label="会诊诊断"
          >
            {{formModel.definitediagnosis}}
          </a-form-model-item>
          <a-form-model-item label="患者病情" >
           {{formModel.memo}}
          </a-form-model-item>
          <a-form-model-item label="补充患者资料">
           
          </a-form-model-item>
          <div v-if="formModel.consultationattr === '3'">
            <a-divider orientation="left">肿瘤分期</a-divider>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  label="分期方法"
                  :label-col="labelCol2"
                >
                  {{formModel.staging_method}}
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  ref="classification_stages"
                  label="类别"
                  :label-col="labelCol2"
                >
                  {{formModel.classification_stages}}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  ref="primary_tumor"
                  label="原发肿瘤"
                  :label-col="labelCol2"
                >
                  {{formModel.primary_tumor}}
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  ref="lymph_metastasis"
                  label="淋巴结转移"
                  :label-col="labelCol2"
                >
                  {{formModel.lymph_metastasis}}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  ref="distant_metastasis"
                  label="远处转移"
                  :label-col="labelCol2"
                >
                  {{formModel.distant_metastasis}}
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  ref="by_stages"
                  label="分期"
                  :label-col="labelCol2"
                >
                  {{formModel.by_stages}}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-divider />
          </div>

          <a-form-model-item label="会诊对象">
            {{selectedDoctorsKeys}}
          </a-form-model-item>
          <a-row>
            <a-col :span="12">
              <a-form-model-item
                label="申请医生"
                :label-col="labelCol2"
              >
                {{formModel.applydoctor}}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="联系方式"
                :label-col="labelCol2"
              >
               {{formModel.phone}}
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
export default {
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
      btnReSendLoading: false,
      btnWithdrawLoading: false,
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
            key: item.consuldoctorname,
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
      immediate: true, //启动首次监听
    },
  },
  methods: {
    initFormData(){
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
        applydate:null,
        pat_status: -1,
      }
    },
    loadData() {
      if (this.initData.primaryKey !== 0) {
        this.formSpinning = true;
        let url =
          this.$Api.Consultation.ApplyInfo +
          "?folio=" +
          this.initData.primaryKey;
        console.log("url=", url);
        this.$Http.AsyncPost(url).then((res) => {
          this.formModel = res.data;
          this.formSpinning = false;
        });
      }
    },
    handlerCancel() {
      this.$emit("update:visible", false); //父组件里通过.sync的props变量，才能通过次方式进行修改 这里是:visible.sync
    },
    handlerSave() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //验证成功
          this.btnSaveLoading = true;
          this.formModel.pat_status = 2;
          let param = {
            hdconsultation: this.formModel,
            fileList: [],
          };
          this.$Http
            .AsyncPost(this.$Api.Consultation.AddApply, param)
            .then((res) => {
              this.btnSaveLoading = false;
              this.$message.info("发送成功");
              this.$emit("update:visible", false); //关闭对话框
              console.log(res);
            });
        } else {
          console.log("error handlerSave!!");
          return false;
        }
      });
    },
    handlerDraftApply() {
      //草稿提交
      this.$refs.editForm.validate((valid) => {
        //验证成功
        if (valid) {
          this.formModel.patsource = "3"; //1门诊、3住院、4体检、2急诊、9其他
          this.btnDraftApplyLoading = true;
          this.$Http
            .AsyncPost(this.$Api.Consultation.DraftApply, this.formModel)
            .then((res) => {
              this.btnDraftApplyLoading = false;
              this.$message.info("发送成功（从草稿状态)");
              this.$emit("update:visible", false);
              console.log(res);
            });
        } else {
          console.log("error onDraftApply!!");
          return false;
        }
      });
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