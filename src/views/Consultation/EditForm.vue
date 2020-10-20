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
        <a-button key="back" @click="handleCancel">关闭</a-button>
        <a-button key="back1" @click="resetForm">重置</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="onSubmit">提交</a-button>
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
        <a-form-model-item ref="type" label="会诊类型" prop="type">
          <a-radio-group default-value="a" button-style="solid" v-model="formModel.type">
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
            <a-form-model-item label="会诊患者" prop="region" :label-col="labelCol2">
              <a-select v-model="formModel.region" placeholder="请选择会诊患者">
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="会诊时间" required prop="date1" :label-col="labelCol2">
              <a-date-picker
                v-model="formModel.date1"
                show-time
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
          </a-form-model-item>
          </a-col> 
        </a-row>

        <a-form-model-item label="会诊目的" prop="desc">
          <span>常用目的:</span>
          <a-button type="link" @click="selectCommonTarget('明确诊断')">明确诊断</a-button>
          <a-button type="link" @click="selectCommonTarget('用药指导')">用药指导</a-button>
          <a-button type="link" @click="selectCommonTarget('治疗效果评价')">治疗效果评价</a-button>
          <a-input v-model="formModel.desc" type="textarea" placeholder="点击上诉常用选项 或 输入"/>
        </a-form-model-item>

        <a-form-model-item label="会诊诊断" prop="region">
          <a-select v-model="formModel.region" placeholder="请选择会诊诊断">
            <a-select-option value="感冒发烧">
              感冒发烧
            </a-select-option>
            <a-select-option value="破伤风">
              破伤风
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="患者病情" prop="desc">
          <a-button type="link" @click="() => { $refs.name.onFieldBlur(); }">导入病情</a-button>
          <a-button type="link" @click="() => {selectAssayVisible=true;}">导入检验</a-button>
          <a-button type="link" @click="selectCommonTarget('治疗效果评价')">导入检查</a-button>
          <a-input v-model="formModel.desc" type="textarea" placeholder="请简单描述患者病情" style="height:100px"/>
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


        <a-divider orientation="left">肿瘤分期</a-divider>
        <a-row>
          <a-col :span="12">
            <a-form-model-item ref="name" label="分期方法" prop="name" has-feedback :label-col="labelCol2">
              <a-select v-model="formModel.region" placeholder="请选分期方法">
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item ref="name" label="类别" prop="name" has-feedback :label-col="labelCol2" >
              <a-select v-model="formModel.region" placeholder="请选类别">
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>      
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item ref="name" label="原发肿瘤" prop="name" has-feedback :label-col="labelCol2">
              <a-select v-model="formModel.region" placeholder="请选原发肿瘤">
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item ref="name" label="淋巴结转移" prop="name" has-feedback :label-col="labelCol2" >
              <a-select v-model="formModel.region" placeholder="请选择淋巴结转移">
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>      
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item ref="name" label="远处转移" prop="name" has-feedback :label-col="labelCol2">
              <a-select v-model="formModel.region" placeholder="请选择远处转移">
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item ref="name" label="分期" prop="name" has-feedback :label-col="labelCol2" >
              <a-select v-model="formModel.region" placeholder="请选择分期">
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>      
        </a-row>
        <a-divider />

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
            <a-form-model-item ref="name" label="申请医生" prop="name" has-feedback :label-col="labelCol2">
              <a-input
                v-model="formModel.name"
                @blur="() => {$refs.name.onFieldBlur();}"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
              <a-form-model-item ref="name" label="联系方式" prop="name" has-feedback :label-col="labelCol2" >
              <a-input
                v-model="formModel.name"
                @blur="() => {$refs.name.onFieldBlur();}"
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
      labelCol: { span: 4 },
      labelCol2: { span: 8 },
      wrapperCol: { span: 14 },
      formModel: {
        type: Object,
        default: () => null
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' },
        ],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
      },
      doctors: ['何云松   100236 呼吸内科', 'XXXX专家组', '呼吸内科'],
      selectAssayVisible:false,//检验选择对话框显示
    };
  },
  methods: {
    handleCancel () {
      this.$emit('update:visible',false); //父组件里通过.sync的props变量，才能通过次方式进行修改 这里是:visible.sync
    },
    onSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {//验证成功
          this.loading = true;
          setTimeout(() => {
            this.visible = false;
            this.loading = false;
            this.$message.info('修改成功')
            this.$emit('update:visible',false);
          }, 3000);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.editForm.resetFields();
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