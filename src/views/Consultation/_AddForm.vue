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
        <a-button key="btnSend" type="primary" :loading="loading" @click="onSend">发送</a-button>
        <a-button key="btnSave" type="primary" :loading="loading" @click="onSave">暂存</a-button>
        <a-button key="btnReset" @click="onResetForm">重置</a-button>
        <a-button key="btnPrint" @click="onPrint">打印</a-button>
        <a-button key="btnClose" @click="handleCancel">取消关闭</a-button>
      </template> 

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
        <a-form-model-item ref="consultationtype" label="会诊类型" required>
          <a-radio-group default-value="a" button-style="solid" v-model="formModel.consultationtype">
            <a-radio-button value="a">
              普通-平会诊
            </a-radio-button>
            <a-radio-button value="b">
              普通-急会诊
            </a-radio-button>
            <a-radio-button value="c">
              MDT会诊
            </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <!--  如果一行要求多个列时，采用栅格布局       
        <a-row :gutter="16">
          <a-col :span="12">
          </a-col>
          <a-col :span="12">
          </a-col>      
        </a-row> 
        -->
        <a-row class="form-row">
          <a-col :span="12">
            <a-form-model-item label="会诊患者" prop="patientid" :label-col="labelCol2">
              <a-select v-model="formModel.patientid" placeholder="请选择会诊患者">
                <a-select-option v-for="(item,index)  in dictPatients" :key="index" :value="item.text" >{{item.text }}</a-select-option> 
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="会诊时间" prop="applydate" :label-col="labelCol2">
              <a-date-picker
                v-model="formModel.applydate"
                placeholder="选择日期"
                style="width: 100%;"
              />
          </a-form-model-item>
          </a-col> 
        </a-row>

        <a-form-model-item label="会诊目的" prop="consultationpurpose">
          <span>常用目的:</span>
          <a-button type="link" @click="selectCommonTarget('明确诊断')">明确诊断</a-button>
          <a-button type="link" @click="selectCommonTarget('用药指导')">用药指导</a-button>
          <a-button type="link" @click="selectCommonTarget('治疗效果评价')">治疗效果评价</a-button>
          <a-input v-model="formModel.desc" type="textarea" placeholder="点击上诉常用选项 或 输入"/>
        </a-form-model-item>

        <a-form-model-item label="会诊诊断" prop="definitediagnosis">
          <a-select v-model="formModel.definitediagnosis" placeholder="请选择会诊诊断">
            <a-select-option value="感冒发烧">
              感冒发烧
            </a-select-option>
            <a-select-option value="破伤风">
              破伤风
            </a-select-option>
          </a-select>
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

        <div v-if="formModel.consultationtype==='c'">
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
    </a-modal>
</template>
<script>
export default {
  props: {//组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
    visible:Boolean,//a-modal 是否显示
  },
  data() {
    return {//组件私有变量
      //Modal相关变量
      loading: false,
      title:'创建会诊',
      //FormModel相关变量
      dictPatients:[ 
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
      ],
      labelCol: { span: 4 },
      labelCol2: { span: 8 },
      wrapperCol: { span: 14 },
      formModel: {
        default: () => null
      },
      dict_staging_method:this.$GlobalDict.TumorStaging.StagingMethod.GetDict(),
      dict_classification_stages:this.$GlobalDict.TumorStaging.ClassificationStages.GetDict(), 
      dict_lymph_metastasis:this.$GlobalDict.TumorStaging.LymphMetastasis.GetDict(),
      dict_primary_tumor:this.$GlobalDict.TumorStaging.PrimaryTumor.GetDict(),
      dict_distant_metastasis:this.$GlobalDict.TumorStaging.DistantMetastasis.GetDict(),
      dict_by_stages:this.$GlobalDict.TumorStaging.ByStages.GetDict(),
      rules: {
        patientid: [
          { required: true, message: '请选择会诊患者', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
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
  methods: {
    handleCancel () {
      this.$emit('update:visible',false); //父组件里通过.sync的props变量，才能通过次方式进行修改 这里是:visible.sync
    },
    onSave() {
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.loading = true;
          setTimeout(() => {
            this.visible = false;
            this.loading = false;
            this.$message.info('保存成功')
            this.$emit('update:visible',false);
          }, 3000);
        } else {
          console.log('error onSave!!');
          return false;
        }
      });
    },
    onSend() {
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.loading = true;
          setTimeout(() => {
            this.visible = false;
            this.loading = false;
            this.$message.info('发送成功')
            this.$emit('update:visible',false);
          }, 3000);
        } else {
          console.log('error onSend!!');
          return false;
        }
      });
    },
    onResetForm() {
      this.$refs.editForm.resetFields();
    },
    onPrint(){
      console.log('formModel=',this.formModel)
    },
    selectCommonTarget(e) {
      console.log(e);
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
    
   


  },
};
</script>
<style>

</style>