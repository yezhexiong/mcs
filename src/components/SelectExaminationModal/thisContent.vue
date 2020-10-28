<template>
  <div>
    <a-alert
      banner
      :message="'导入病人[' + patientName + ']检查'"
      description="选择某检查项目后导入，则导入该项目所有信息；选择某检查项目中某些项后导入，则导入该项的信息；"
      type="info"
    />
    <a-spin tip="Loading..." :spinning="dataSpinning">
      <a-row>
        <a-col :span="8">
          <a-table
            size="small"
            :scroll="{ y: 600 }"
            :pagination="false"
            :columns="columns"
            :data-source="dataAllItem"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: handlerSelectChange,
              onSelect:handlerSetCheck,
            }"
          >
            <template slot="item1" slot-scope="text, record">
              <div
                v-on:click="handlerItem1Click(record.key)"
                style="cursor: pointer"
              >
                <div
                  v-if="record.key === curSelectItem"
                  style="
                    background: #08979c;
                    width: 100%;
                    color: #fff;
                    padding: 2px;
                  "
                >
                    {{ record.examitemname + "  " + record.lastupdatedate}}
                </div>
                <div v-else>{{ record.examitemname + "  " + record.lastupdatedate }}</div>
              </div>
            </template>
          </a-table>
        </a-col>
        <a-col :span="16">
          <span style="margin:10px;"> {{ itemDetail }}</span>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
const columns = [
  { title: "检查项", key: "item1", scopedSlots: { customRender: "item1" } },
];

export default {
  props: {
    //组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
    patientId: String, //当前病人主键
    patientName: String, //当前病人项目
  },
  data() {
    return {
      dataAllItem: [],
      columns,
      selectedRowKeys: [],
      selectedItems: [],
      curSelectItem: 0,
      dataSpinning: false, //表单加载状态
      itemDetail: "", //某项的详细
    };
  },
  watch: {
    patientId: {
      handler(val) {
        console.log("watch patientId=", val);
        if (typeof this.patientId === "undefined" || this.patientId === "") {
          this.$message.error("选中病人检查结果窗体，patientId值不能未空");
          return;
        }
        this.dataSpinning = true;
        let url = this.$Api.Common.GetExamReport;
        let param = {
          PatId: this.patientId,
          IsClinic: false,
        };
        this.$Http.AsyncPost(url, param).then((res) => {
          let count = res.data.length;
          for (let i = 0; i < count; ++i) {
            let item = res.data[i];
            item.key = i;
          }
          this.dataAllItem = res.data;
          console.log('this.dataAllItem=',this.dataAllItem)
          if (this.dataAllItem.length > 0) {
            this.handlerItem1Click(this.dataAllItem[0].key);
          }
          this.dataSpinning = false;
        });
      },
      immediate: true, //启动首次监听
    },
  },
  computed: {},
  methods: {
    handlerItem1Click(index) {
      this.curSelectItem = index;
      this.itemDetail = this.dataAllItem[index].rptsubjectivedesc;
    },
    handlerSelectChange(selectedRowKeys) {
      this.selectedItems=[]
      this.selectedRowKeys = selectedRowKeys;
      this.dataAllItem.forEach(item=>{
        if (this.selectedRowKeys.includes(item.key)) {
          this.selectedItems.push({
            key:item.key,
            item:item.examitemname,
            value:item.rptsubjectivedesc,
          })
        }
      })
    },
    handlerSetCheck(record){
      this.handlerItem1Click(record.key)
    },
  },
};
</script>