<template>
  <div>
    <a-alert
      banner
      :message="'导入病人[' + patientName + ']检验'"
      description="选择某检查项目后导入，则导入该项目所有信息；选择某检查项目中某些项后导入，则导入该项的信息；"
      type="info"
    />
    <a-spin tip="Loading..." :spinning="dataSpinning">
      <a-row>
        <a-col :span="4">
          <a-table
            size="small"
            :scroll="{ y: 600 }"
            :pagination="false"
            :columns="columns"
            :data-source="dataAllItem"
          >
            <template slot="item1" slot-scope="text, record">
              <div
                v-on:click="handlerItem1Click(record.testreqno)"
                style="cursor: pointer"
              >
                <div
                  v-if="record.testreqno === curSelectItem1"
                  style="
                    background: #08979c;
                    width: 100%;
                    color: #fff;
                    padding: 2px;
                  "
                >
                  <span>
                    {{ record.testtext }}
                  </span>
                  <span>
                    {{ record.reqdate.format("yyyy-MM-dd") }}
                  </span>
                </div>
                <div v-else>{{ record.testtext + "  " + record.reqdate }}</div>
              </div>
            </template>
          </a-table>
        </a-col>
        <a-col :span="10">
          <a-table
            size="small"
            :scroll="{ y: 600 }"
            :pagination="false"
            :columns="columns2"
            :data-source="dataShowItemInfo"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: handlerSelectChange,
            }"
          >
          </a-table>
        </a-col>
        <a-col :span="10">
          <a-table
            size="small"
            :scroll="{ y: 600 }"
            :pagination="false"
            :columns="columns3"
            :data-source="selectedItemInfo"
          >
            <template slot="slot3_2" slot-scope="text, record">
              <a-button
                icon="delete"
                size="small"
                type="primary"
                @click="handlerCancelSelect(record.key)"
              ></a-button>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
const columns = [
  { title: "检验项目", key: "item1", scopedSlots: { customRender: "item1" } },
];
const columns2 = [
  {
    title: "检验项",
    dataIndex: "resultitemname",
    key: "col2_1",
  },
  {
    title: "值",
    dataIndex: "result",
    key: "col2_2",
  },
  {
    title: "单位",
    dataIndex: "unit",
    key: "col2_3",
  },
  {
    title: "参考",
    dataIndex: "normalresult",
    key: "col2_4",
  },
];
const columns3 = [
  {
    title: "检验项",
    dataIndex: "resultitemname",
    key: "col3_1",
  },
  {
    title: "值",
    dataIndex: "result",
    key: "col3_2",
  },
  {
    title: "单位",
    dataIndex: "unit",
    key: "col3_3",
  },
  {
    title: "参考",
    dataIndex: "normalresult",
    key: "col3_4",
  },
  {
    title: "",
    width: 60,
    key: "table3_2",
    scopedSlots: { customRender: "slot3_2" },
  },
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
      dataShowItemInfo: [],
      dataAllItemInfo: [],
      selectedItemInfo: [],
      columns,
      columns2,
      columns3,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      curSelectItem1: 0,
      dataSpinning: false, //表单加载状态
    };
  },
  watch: {
    patientId: {
      handler(val) {
        console.log("watch patientId=", val);
        if (typeof this.patientId === "undefined" || this.patientId === "") {
          this.$message.error("选中病人检验结果窗体，patientId值不能未空");
          return;
        }
        this.dataSpinning = true;
        let promiseList = []; //axios请求集
        {
          let url = this.$Api.Common.GetLabTestItem;
          let param = {
            strPatID: this.patientId,
            nVisitID: null,
            dtVisitDate: null,
            nVisitNo: null,
            bIsInPat: false,
            eListResultStatus: [51, 52, 53],
            dtScheduledDateTimeFrom: null,
            dtScheduledDateTimeTo: null,
            strListReqDept: [],
            strWardCode: null,
            strDeptCode: null,
            IsError: false,
            ErrMessage: null,
          };
          promiseList.push(this.$Http.AsyncPost(url, param));
        }
        {
          let url = this.$Api.Common.GetLabTestItemInfo;
          let param = {
            strPatID: this.patientId,
            nVisitID: null,
            dtVisitDate: null,
            nVisitNo: null,
            bIsInPat: false,
            eListResultStatus: [],
            dtScheduledDateTimeFrom: null,
            dtScheduledDateTimeTo: null,
            strListReqDept: [],
            strWardCode: null,
            strDeptCode: null,
            IsError: false,
            ErrMessage: null,
          };
          promiseList.push(this.$Http.AsyncPost(url, param));
        }

        this.$Http.AxiosAll(promiseList).then((resList) => {
          this.dataAllItem = resList[0].data;
          let count = resList[1].data.length;
          for (let i = 0; i < count; ++i) {
            let item = resList[1].data[i];
            item.key = item.testresultno;
          }
          this.dataAllItemInfo = resList[1].data;
          this.dataSpinning = false;
          if (this.dataAllItem.length > 0){
            this.handlerItem1Click(this.dataAllItem[0].testreqno)
          }
        });
      },
      immediate: true,//启动首次监听
    },
  },
  computed: {
  },
  methods: {
    // onSelectChange(selectedRowKeys) {
    //   this.selectedRowKeys = selectedRowKeys;
    // },
    handlerItem1Click(val) {
      this.curSelectItem1 = val;
      this.dataShowItemInfo = this.dataAllItemInfo.filter((item) => {
        return item.testreqno === val;
      });
    },
    handlerSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;

      this.dataAllItemInfo.forEach((item) => {
        if (this.selectedRowKeys.includes(item.testresultno)) {
          let isExit = false;
          this.selectedItemInfo.forEach((obj) => {
            if (obj.testresultno === item.testresultno) {
              isExit = true;
            }
          });
          if (!isExit) {
            this.selectedItemInfo.push(item);
          }
        }
      });
      //去除没有选中的项
      this.selectedItemInfo.forEach((item) => {
        if (!this.selectedRowKeys.includes(item.testresultno)) {
          this.selectedItemInfo.removeValue(item);
        }
      });
    },
    handlerCancelSelect(key) {
      console.log("key=", key);
      this.selectedItemInfo = this.selectedItemInfo.filter((item) => {
        return item.key !== key;
      });
      this.selectedRowKeys.forEach((_key) => {
        if (_key === key) {
          this.selectedRowKeys.removeValue(key);
        }
      });
    },
  },
};
</script>