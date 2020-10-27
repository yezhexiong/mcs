<template>
  <div>
    <a-alert banner message="选择会诊对象" description="" type="info" />
    <a-spin tip="Loading..." :spinning="dataSpinning">
      <a-row>
        <a-col :span="4"> </a-col>
        <a-col :span="10">
          <a-input-search
            placeholder="input search text"
            v-model="searchKey"
            @change="handlerSearch"
          />
        </a-col>
        <a-col :span="10"> </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">
          <a-table
            size="small"
            :scroll="{ y: 600 }"
            :pagination="false"
            :columns="table1Columns"
            :data-source="table1Data"
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
            :pagination="pagination"
            :columns="table2Columns"
            :data-source="table2Data"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: handlerSelectChange,
            }"
            @change="handlerTableChange"
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
            :columns="table3Columns"
            :data-source="table3Data"
          >
            <template slot="slot3" slot-scope="text, record">
              {{ record.type + record.value + "  " + record.searchKey + "  " }}
              <span v-if="'' !== record.field2">
                {{ "(" + record.field2 + ")" }}
              </span>
            </template>
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
export default {
  data() {
    return {
      table1Columns: [
        {
          title: "会诊对象类型",
          key: "table1_1",
          scopedSlots: { customRender: "slot1" },
        },
      ],
      table2Columns: [
        {
          title: "待选对象",
          key: "table2_1",
          scopedSlots: { customRender: "slot2" },
        },
      ],
      table3Columns: [
        {
          title: "已选会诊对象",
          key: "table3_1",
          scopedSlots: { customRender: "slot3" },
        },
        {
          title: "",
          width: 60,
          key: "table3_2",
          scopedSlots: { customRender: "slot3_2" },
        },
      ],
      table1Data: [
        { key: "1", value: `按科室` },
        { key: "2", value: `按专家组` },
        { key: "3", value: `按个人` },
      ],
      table2Data: [],
      table3Data: [], //选中数据集

      searchKey: "",
      // doctors,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      curSelectItem1: 0,
      dataSpinning: false, //表单加载状态
      pagination: {
        hideOnSinglePage: true,
        pageSize: 15,
        current: 1,
        total: 0,
      }, //hideOnSinglePage 只有页则不显示分页控件
    };
  },
  mounted() {
    //mounted 是生命周期方法之一，会在对应生命周期时执行。
    this.handlerItem1Click("1");
  },
  computed: {},
  methods: {
    handlerSearch() {
      this.pagination.current = 1;
      if (this.curSelectItem1 === "1") {
        //科室
        this.getOffice();
      }
      if (this.curSelectItem1 === "3") {
        //个人
        this.getDoctors();
      }
    },
    handlerItem1Click(val) {
      this.curSelectItem1 = val;
      this.handlerSearch();
    },
    /**
     * 获取科室
     */
    getOffice() {
      this.dataSpinning = true;
      this.table2Data = [];
      let key = this.searchKey.toUpperCase();
      this.$GlobalData.GetOfficesInPage(this.pagination, key).then((res) => {
        res.data.forEach((item) => {
          this.table2Data.push({
            key: item.itemcode,
            id: item.itemcode,
            value: item.itemname,
            searchKey: item.inputcode, //配音首字母
            field1: "", //field为抽象字段，不同数据代表不同意思
            field2: "", //
            pkey: this.table1Data[0].key,
          });
        });
        this.pagination.total = res.total; //
        this.dataSpinning = false;
      });
    },
    /**
     * 获取医生
     */
    getDoctors() {
      this.dataSpinning = true;
      this.table2Data = [];
      let key = this.searchKey.toUpperCase();
      this.$GlobalData.GetDoctorsInPage(this.pagination, key).then((res) => {
        console.log("res=", res);
        res.data.forEach((item) => {
          this.table2Data.push({
            key: item.dbuser + item.groupcode,
            id: item.dbuser,
            value: item.name,
            searchKey: item.inputcode, //配音首字母
            field1: item.groupcode,
            field2: item.groupname,
            pkey: this.table1Data[2].key,
          });
        });
        this.pagination.total = res.total;
        this.dataSpinning = false;
      });
    },
    handlerSelectChange(selectedRowKeys) {
      // this.table3Data = [];
      this.selectedRowKeys = selectedRowKeys;

      this.table2Data.forEach((item) => {
        if (this.selectedRowKeys.includes(item.key)) {
          let isExit = false;
          this.table3Data.forEach((obj) => {
            if (obj.key == item.key) {
              isExit = true;
            }
          });
          if (!isExit) {
            let _type = "【专家组】";
            if (this.curSelectItem1 === "1") {
              _type = "【科室】";
            }
            if (this.curSelectItem1 === "3") {
              _type = "【个人】";
            }
            this.table3Data.push({
              id: item.id,
              key: item.key,
              value: item.value,
              searchKey: item.searchKey,
              field2: item.field2,
              type: _type,
            });
          }
        }
      });
      //去除没有选中的项
      this.table3Data.forEach((item) => {
        if (!this.selectedRowKeys.includes(item.key)) {
          // this.table3Data = this.table3Data.filter((item1) => {
          //   return item1.key !== item.key;
          // });
          this.table3Data.removeValue(item)
        }
      });

    },
    //a-table @change 分页、排序、筛选变化时触发
    handlerTableChange(pagination) {
      this.pagination.current = pagination.current;
      if (this.curSelectItem1 === "1") {
        this.getOffice();
      }
      if (this.curSelectItem1 === "3") {
        this.getDoctors();
      }
    },
    handlerCancelSelect(key) {
      console.log("key=", key);
      this.table3Data = this.table3Data.filter((item) => {
        return item.key !== key;
      });
      this.selectedRowKeys.forEach((_key) => {
        if (_key === key) {
          this.selectedRowKeys.removeValue(key);
        }
      });
      console.log("this.selectedRowKeys=", this.selectedRowKeys);
    },
  },
};
</script>