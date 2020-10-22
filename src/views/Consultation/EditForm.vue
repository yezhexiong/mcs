<template>
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
      @cancel="handleCancel"
    >
      <!-- 对话框自定义按钮 -->
      <template slot="footer">
        <!-- approvalstatus 流程状态 99:所有，10：取消会诊，11：驳回申请，0：退回，1:激活，2：完成，3：终止,13:申请中，14：审核通过，15：完成会诊，16：会诊中(已接收) -->
        <span v-if="formModel.approvalstatus==='15' || formModel.approvalstatus==='' ">
          <a-button key="btnSend" type="primary" :loading="btnSendLoading" @click="onSend">发送(直接)</a-button>
        </span>
        <span v-if="formModel.approvalstatus==='15' || formModel.approvalstatus==='' ">
          <a-button key="btnDraftApply" type="primary" :loading="btnDraftApplyLoading" @click="onDraftApply">发送(从草稿)</a-button>
        </span>
        <span v-if="formModel.approvalstatus==='11'">
          <a-button key="btnReSend" type="primary" :loading="btnReSendLoading" @click="onReSend">重新发起</a-button>
        </span>
        <span v-if="formModel.approvalstatus==='15' || formModel.approvalstatus==='' ">
          <a-button key="btnSave" type="primary" :loading="btnSaveLoading" @click="onSave">暂存</a-button>
        </span> 
        <span v-if="formModel.approvalstatus==='13'">
          <a-button key="btnWithdraw" type="primary" :loading="btnWithdrawLoading" @click="onWithdraw">撤销申请</a-button>
        </span>
        <span v-if="formModel.approvalstatus==='15'">
          <a-button key="btnDelete" type="primary" :loading="btnDeleteLoading" @click="onDelete">删除</a-button>
        </span>
        <!-- <span v-if="formModel.approvalstatus==='15'"> -->         
          <a-button key="btnPrint" @click="onPrint">打印</a-button>
        <!-- </span> -->
        <a-button key="btnReset" @click="onResetForm">重置</a-button>
        <a-button key="btnClose" @click="handleCancel">取消关闭</a-button>
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
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"        
        >
          <a-form-model-item label="会诊患者">
              姓名:{{formModel.name}}
              编号:{{formModel.patientid}}
              就诊号:{{formModel.visitid}}
          </a-form-model-item>
          <a-form-model-item ref="consultationattr" label="会诊类型" required>
            <a-radio-group default-value="2" button-style="solid" v-model="formModel.consultationattr">
              <a-radio-button value="2">
                普通-平会诊
              </a-radio-button>
              <a-radio-button value="1">
                普通-急会诊
              </a-radio-button>
              <a-radio-button value="3">
                MDT会诊
              </a-radio-button>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="会诊时间" prop="applydate">
            <a-date-picker
              v-model="formModel.applydate"
              placeholder="选择日期"
              style="width: 250px;"
            />
          </a-form-model-item>
          <a-form-model-item label="会诊目的" prop="consultationpurpose">
            <span>常用目的:</span>
            <a-button type="link" @click="selectCommonTarget('明确诊断')">明确诊断</a-button>
            <a-button type="link" @click="selectCommonTarget('用药指导')">用药指导</a-button>
            <a-button type="link" @click="selectCommonTarget('治疗效果评价')">治疗效果评价</a-button>
            <a-input v-model="formModel.consultationpurpose" type="textarea" placeholder="点击上诉常用选项 或 输入"/>
          </a-form-model-item>

          <a-form-model-item label="会诊诊断" prop="definitediagnosis">
            <div class="certain-category-search-wrapper">
             <a-auto-complete
              class="global-search" 
              placeholder="请选择会诊诊断"
              v-model="formModel.definitediagnosis"
              :data-source="dataSourceDefinitediagnosis"
              @search="handleSearchInDefinitediagnosis"
            />
            </div>
          </a-form-model-item>
          <a-form-model-item label="患者病情" prop="memo">
            <a-button type="link" @click="() => { $refs.name.onFieldBlur(); }">导入病情</a-button>
            <a-button type="link" @click="() => {selectAssayVisible=true;}">导入检验</a-button>
            <a-button type="link" @click="selectCommonTarget('治疗效果评价')">导入检查</a-button>
            <a-input v-model="formModel.memo" type="textarea" placeholder="请简单描述患者病情" style="height:100px"/>
          </a-form-model-item>

          <select-assay-modal
            ref="select-assay-modal"
            :visible.sync="selectAssayVisible"
          />

          <a-form-model-item label="补充患者资料" prop="region">
            <a-upload-dragger
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="uploadFiles"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="cloud-upload" /><span style="padding-left:10px;">点击【上传】或拖动资料到此区域完成上传</span>
              </p>
            </a-upload-dragger>
          </a-form-model-item>
          <div v-if="formModel.consultationattr==='3'">
            <a-divider orientation="left">肿瘤分期</a-divider>
            <a-row>
              <a-col :span="12">
                <a-form-model-item ref="staging_method" label="分期方法" prop="staging_method" :label-col="labelCol2">
                  <a-select v-model="formModel.staging_method" placeholder="请选分期方法">
                    <!-- <a-select-option v-for="(item,index)  in dict_staging_method" :key="index" :value="item.dict_code"  >{{item.dict_value}}</a-select-option>  -->
                    <a-select-option v-for="item1 in dict_staging_method" :key="item1" :value="item1.dict_code"  >{{item1.dict_value}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="classification_stages" label="类别" :label-col="labelCol2" >
                  <a-select v-model="formModel.classification_stages" placeholder="请选类别">
                    <a-select-option v-for="item2 in dict_classification_stages" :key="item2" :value="item2.dict_code"  >{{item2.dict_value}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>      
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item ref="primary_tumor" label="原发肿瘤" :label-col="labelCol2">
                  <a-select v-model="formModel.primary_tumor" placeholder="请选原发肿瘤">
                    <a-select-option v-for="item3 in dict_primary_tumor" :key="item3" :value="item3.dict_code"  >{{item3.dict_value}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="lymph_metastasis" label="淋巴结转移" :label-col="labelCol2" >
                  <a-select v-model="formModel.lymph_metastasis" placeholder="请选择淋巴结转移">
                    <a-select-option v-for="item4 in dict_lymph_metastasis" :key="item4" :value="item4.dict_code"  >{{item4.dict_value}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>      
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item ref="distant_metastasis" label="远处转移" :label-col="labelCol2">
                  <a-select v-model="formModel.distant_metastasis" placeholder="请选择远处转移">
                    <a-select-option v-for="item5 in dict_distant_metastasis" :key="item5" :value="item5.dict_code"  >{{item5.dict_value}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="by_stages" label="分期" :label-col="labelCol2" >
                  <a-select v-model="formModel.by_stages" placeholder="请选择分期">
                    <a-select-option v-for="item6 in dict_by_stages" :key="item6" :value="item6.dict_code"  >{{item6.dict_value}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>      
            </a-row>
            <a-divider />
          </div>

          <a-form-model-item label="会诊对象" prop="desc">
            <a-tag style="background: #fff; borderStyle: dashed;" @click="selectDoctors">
              <a-icon type="plus" /> 添加对象
            </a-tag>
            <template v-for="(tag) in doctors">
              <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                <a-tag :key="tag" :closable="true" @close="() => handleClose(tag)" color="#f50">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else :key="tag" :closable="true" @close="() => handleClose(tag)" color="#f50">
                {{ tag }}
              </a-tag>
            </template>
          </a-form-model-item>
          <!--  如果一行要求多个列时，采用栅格布局       
          <a-row :gutter="16">
            <a-col :span="12">
            </a-col>
            <a-col :span="12">
            </a-col>      
          </a-row> 
          -->
          <a-row>
            <a-col :span="12">
              <a-form-model-item ref="applydoctor" label="申请医生" prop="applydoctor" has-feedback :label-col="labelCol2">
                <a-input
                  v-model="formModel.applydoctor"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item ref="phone" label="联系方式" prop="phone" has-feedback :label-col="labelCol2" >
                <a-input
                  v-model="formModel.phone"
                />
              </a-form-model-item>
            </a-col>      
          </a-row>

        </a-form-model>
      </a-spin>
    </a-modal>
</template>
<script>
export default {
  props: {//组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
    visible:Boolean,//a-modal 是否显示
    initData:{//初始值
      type: Object,
      default () {
          return {
            isCreat:false,//是否创建
            primaryKey:0,//如果不是创建，则需要传递主键值
            patientId:'001',//患者主键
            patientName:'叶哲雄',//患者姓名
            patientVisitId:'001',//就诊主键
            patientDiagnosis:'小感冒',//患者主诊断
          }
      }
    }
  },
  data() {
    return {//组件私有变量
      //Modal相关变量      
      title:'创建会诊申请单',
      //FormModel相关变量

      btnSaveLoading:false,
      btnSendLoading:false,
      btnDraftApplyLoading:false,
      btnReSendLoading:false,
      btnWithdrawLoading:false,
      btnDeleteLoading:false,

      formSpinning:false,//表单加载状态   

      labelCol: { span: 4 },
      labelCol2: { span: 8 },
      wrapperCol: { span: 14 },

      formModel: {
        "approvalstatus":"-1",
        "consultationpurpose":"",
        "consultationattr":'2',//默认普通平会诊
      },

      dict_staging_method:this.$GlobalDict.TumorStaging.StagingMethod.GetDict(),
      dict_classification_stages:this.$GlobalDict.TumorStaging.ClassificationStages.GetDict(), 
      dict_lymph_metastasis:this.$GlobalDict.TumorStaging.LymphMetastasis.GetDict(),
      dict_primary_tumor:this.$GlobalDict.TumorStaging.PrimaryTumor.GetDict(),
      dict_distant_metastasis:this.$GlobalDict.TumorStaging.DistantMetastasis.GetDict(),
      dict_by_stages:this.$GlobalDict.TumorStaging.ByStages.GetDict(),

      dataSourceDefinitediagnosis:[],//会诊诊断数据源

      rules: {
        applydate: [{ required: true, message: '请选择会诊日期', trigger: 'blur' }],
        consultationpurpose: [{ required: true, message: '请填写会诊目的', trigger: 'blur' }],
        definitediagnosis: [{ required: true, message: '请选择会诊诊断', trigger: 'blur' }],
        memo: [{ required: true, message: '请填写患者病情', trigger: 'blur' }],
        applydoctor: [{ required: true, message: '请填写申请医生', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
        staging_method: [{ required: true, message: '请选择分期方法', trigger: 'blur' }],
      },
      doctors: ['何云松   100236 呼吸内科', 'XXXX专家组', '呼吸内科'],
      selectAssayVisible:false,//检验选择对话框显示
    };
  },
  mounted() {//mounted 是生命周期方法之一，会在对应生命周期时执行。
  },
  watch: {
    initData:{
      handler() {
        if(this.initData.isCreat){
          this.title="创建会诊申请单"
          this.formModel = {
            ... this.formModel,
            ... this.initData
          }
        }else{
          this.title="修改会诊申请单"
          this.loadData()
        }
      },
      deep: true,//监听对象时，需要开启
    },
  },
  methods: {
    loadData(){
      if(this.primaryKey !== 0){
        this.formSpinning = true
        let url = this.$Api.Consultation.ApplyInfo+'?folio='+this.initData.primaryKey
        this.$Http.AsyncPost(url).then(res => {
          this.formModel = res.data;
          this.formSpinning = false
        })
      }
    },
    handleCancel () {
      this.$emit('update:visible',false); //父组件里通过.sync的props变量，才能通过次方式进行修改 这里是:visible.sync
    },
    onSave() {
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.btnSaveLoading = true;
          this.formModel.PAT_STATUS = 2
          this.$Http.AsyncPost(this.$Api.Consultation.AddApply,this.formModel).then(res => {
            this.btnSaveLoading = false;
            this.$message.info('暂存成功')
            this.$emit('update:visible',false);//关闭对话框
            console.log(res)
          });
        } else {
          console.log('error onSave!!');
          return false;
        }
      });
    },
    onDraftApply() {//草稿提交
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.btnDraftApplyLoading = true;
          this.$Http.AsyncPost(this.$Api.Consultation.DraftApply,this.formModel).then(res => {
            this.btnDraftApplyLoading = false;
            this.$message.info('发送成功（从草稿状态)')
            this.$emit('update:visible',false);
            console.log(res)
          });
        } else {
          console.log('error onDraftApply!!');
          return false;
        }
      });
    },
    onSend() {
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.btnSendLoading = true;
          this.formModel.PAT_STATUS = 1      
          this.$Http.AsyncPost(this.$Api.Consultation.AddApply,this.formModel).then(res => {
            this.btnSendLoading = false;
            this.$message.info('发送成功')
            this.$emit('update:visible',false);
            console.log(res)
          });
        } else {
          console.log('error onSend!!');
          return false;
        }
      });
    },    
    onResetForm() {      
      this.$refs.editForm.resetFields();
    },
    btnDelete(){
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.btnDeleteLoading = true;
          this.formModel.PAT_STATUS = 2
          this.$Http.AsyncPost(this.$Api.Consultation,this.formModel).then(res => {
            this.btnDeleteLoading = false;
            this.$message.info('删除成功')
            this.$emit('update:visible',false);//关闭对话框
            console.log(res)
          });
        } else {
          console.log('error onSave!!');
          return false;
        }
      });
    },
    btnWithdraw() {
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.btnWithdrawLoading = true;
          this.formModel.PAT_STATUS = 2
          this.$Http.AsyncPost(this.$Api.Consultation,this.formModel).then(res => {
            this.btnWithdrawLoading = false;
            this.$message.info('发送成功')
            this.$emit('update:visible',false);//关闭对话框
            console.log(res)
          });
        } else {
          console.log('error onSave!!');
          return false;
        }
      });
    },
    btnReSend() {
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.btnReSendLoading = true;
          this.formModel.PAT_STATUS = 2
          this.$Http.AsyncPost(this.$Api.Consultation,this.formModel).then(res => {
            this.btnReSendLoading = false;
            this.$message.info('发送成功')
            this.$emit('update:visible',false);//关闭对话框
            console.log(res)
          });
        } else {
          console.log('error onSave!!');
          return false;
        }
      });
    },
    onPrint(){
      console.log('print=')
      console.log('formModel=',this.formModel)
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message.info('onPrint')
      }, 3000);
    },
    selectCommonTarget(val) {
      this.formModel.consultationpurpose += val+';    '
    },
    uploadFiles(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },
    selectDoctors() {//选择会诊对象
      alert("选择会诊对象")
    },
    handleSearchInDefinitediagnosis(value){//会诊诊断 模糊搜索
      let searchParam = {
        "enumoutercoding": 14,
        "searchkey": value,
        "pagenum": 1,
        "pagesize":10
      }
      this.dataSourceDefinitediagnosis = []
      this.$Http.AsyncPost(this.$Api.Common.SerchCodeConfig,searchParam).then(res => {
        const arr = [];
        res.data.clslistiteminfo.forEach(item => arr.push(item.itemname))
        this.dataSourceDefinitediagnosis = arr
      });
    }

  },
};
</script>
<style>
.ant-modal-footer button {
    margin-left: 8px;
}
</style>