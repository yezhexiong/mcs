<template>
  <div>
    <a-alert banner message="选择会诊对象" description="" type="info" />
    <a-spin tip="Loading..." :spinning="dataSpinning">
      <a-row>
        <a-col :span="4">
          <a-table
            size="small"
            :scroll="{ y: 600 }"
            :pagination="false"
            :columns="columns"
            :data-source="data"
          >
            <template slot="slot1" slot-scope="text, record">
              <div
                v-on:click="handlerItem1Click(record.key)"
                style="cursor: pointer"
              >
                <div
                  v-if="record.key === curSelectItem1"
                  style="
                    background: #08979c;
                    width: 100%;
                    color: #fff;
                    padding: 2px;
                  "
                >
                  {{ record.value }}
                </div>
                <div v-else>{{ record.value }}</div>
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
            :data-source="data22"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: handlerSelectChange,
            }"
          >
            <template slot="slot2" slot-scope="text, record">
              {{ record.value + "(" + record.searchKey + ")" }}
              <span v-if="'3' === curSelectItem1">
                {{ "(" + record.field2 + ")" }}
              </span>
            </template>
          </a-table>
        </a-col>
        <a-col :span="10">
          <a-table
            size="small"
            :scroll="{ y: 600 }"
            :pagination="false"
            :columns="columns3"
            :data-source="selectData"
          />
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
const columns = [
  {
    title: "会诊对象类型",
    key: "table1_1",
    scopedSlots: { customRender: "slot1" },
  },
];
const columns2 = [
  {
    title: "待选对象",
    key: "table2_1",
    scopedSlots: { customRender: "slot2" },
  },
];
const columns3 = [
  {
    title: "已选会诊对象",
    dataIndex: "value",
    key: "table3_1",
  },
];

const data = [
  {
    key: "1",
    value: `按科室`,
  },
  {
    key: "2",
    value: `按专家组`,
  },
  {
    key: "3",
    value: `按个人`,
  },
];

const data22 = [];
const selectData = [];
const offices = [];

export default {
  data() {
    return {
      data,
      data22,
      selectData,
      columns,
      columns2,
      columns3,
      offices,
      // doctors,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      curSelectItem1: 0,
      dataSpinning: false, //表单加载状态
    };
  },
  mounted() {
    //mounted 是生命周期方法之一，会在对应生命周期时执行。
    this.handlerItem1Click('1')
  },
  computed: {
    //
    //  handlerTable2RowSelection() {
    //     return {
    //       onChange: (selectedRowKeys, selectedRows) => {
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //       },
    //       getCheckboxProps: record => ({
    //         props: {
    //           disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //           name: record.name,
    //         },
    //       }),
    //     };
    //   },
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      console.log("selectedRowKeys changed: ", selectedRowKeys);
    },
    handlerItem1Click(val) {
      this.curSelectItem1 = val;
      console.log(val);
      if (this.curSelectItem1 === "1") {
        //科室
        this.getOffice()
      }
      if (this.curSelectItem1 === "2") {
        //专家组
        this.data22=[]
      }
      if (this.curSelectItem1 === "3") {
        //个人
        this.getDoctors()
      }
    },
    /**
     * 获取科室
     */
    getOffice() {
      if (typeof this.offices == "undefined" || this.offices.length === 0) {
        this.dataSpinning = true;
        this.data22 = [];
        this.$GlobalData.GetOffices().then((list) => {
          list.forEach((item) => {
            this.data22.push({
              key: item.itemcode,
              id:item.itemcode,
              value: item.itemname,
              searchKey: item.inputcode, //配音首字母
              field1: "", //field为抽象字段，不同数据代表不同意思
              field2: "", //
              pkey: data[0].key,
            });
            this.dataSpinning = false;
          });
        });
      }
    },    
    /**
     * 获取医生
     */
    getDoctors() {
      this.dataSpinning = true;
      this.data22 = [];
      this.$GlobalData.GetAllDoctors().then((list) => {
        list.forEach((item) => {
          this.data22.push({
            key: item.dbuser+item.groupcode,
            id:item.dbuser,
            value: item.name,
            searchKey: item.inputcode, //配音首字母
            field1: item.groupcode,
            field2: item.groupname,
            pkey: data[2].key,
          });
          this.dataSpinning = false;
        });
      });
    },
    handlerSelectChange(selectedRowKeys) {
      // console.log('selectedRows changed: ', selectedRows);
      this.selectData = [];
      this.data22.forEach((item) => {
        if (selectedRowKeys.includes(item.key)) {
          let isExit = false;
          this.selectData.forEach((obj) => {
            if (obj.key == item.key) {
              isExit = true;
            }
          });
          if (!isExit) {
            this.selectData.push(item);
          }
        }
      });
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>