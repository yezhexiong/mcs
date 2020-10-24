<template>
  <div>
    <a-alert 
      banner 
      message="导入检验项"
      description="选择某检查项目后导入，则导入该项目所有信息；选择某检查项目中某些项后导入，则导入该项的信息；"
      type="info"
    />
    <a-row>
      <a-col :span="6">
        <a-table
          size="small"
          :scroll="{ y: 600 }"
          :pagination="false"
          :columns="columns"
          :data-source="data"
        >
        <template slot="item1" slot-scope="text,record">
          <div v-on:click="handlerItem1Click(record.key)" style="cursor:pointer;">
            <div v-if="record.key===curSelectItem1" style="background:#08979c; width:100%; color:#fff;padding:2px;">{{ record.name }}</div>
            <div v-else>{{ record.name }}</div>
          </div>
        </template>
        
      </a-table>
      </a-col>
      <a-col :span="9">
        <a-table
          size="small"
          :scroll="{ y: 600 }"
          :pagination="false"
          :columns="columns2"
          :data-source="data2"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange:handlerSelectChange }"
        />
      </a-col>
      <a-col :span="9">
        <a-table
          size="small"
          :scroll="{ y: 600 }"
          :pagination="false"
          :columns="columns3"
          :data-source="selectData"
        />
      </a-col>
    </a-row> 
  </div>
</template>

<script>

const columns = [
  { title: '检验项目', key: 'item1' ,scopedSlots: { customRender: 'item1' },},
];
const columns2 = [
  {
    title: '检验项',
    dataIndex: 'name',
    key:'col2_1',
  },{
    title: '值',
    dataIndex: 'key',
    key:'col2_2',
  },{
    title: '单位',
    dataIndex: 'key',
    key:'col2_3',
  },{
    title: '参考',
    dataIndex: 'date',
    key:'col2_4',
  }
];
const columns3 = [
  {
    title: '已选项目',
    dataIndex: 'name',
    key:'col3_1',
  }
];

const data = [
  {
    key: 1,
    name: `血常规(CBC、DIFF)五分类`,
    date: '2020-05-27',
  },
  {
    key: 2,
    name: `网织红细胞计数`,
    date: '2020-05-27',
  },
  {
    key:3,
    name: `血清总蛋白测定`,
    date: '2020-05-27',
  },
  {
    key: 4,
    name: `血常规(CBC、DIFF)五分类`,
    date: '2020-05-27',
  },
  {
    key: 5,
    name: `肌酐测定`,
    date: '2020-05-27',
  },
  ];

const data2 = []
const data22 = [
  {
    key: 1,
    pkey: 1,
    name: `血常规(CBC、DIFF)五分类`,
    date: '2020-05-27',
  },
  {
    key: 2,
    pkey: 1,
    name: `网织红细胞计数`,
    date: '2020-05-27',
  },
  {
    key:3,
    pkey: 2,
    name: `血清总蛋白测定`,
    date: '2020-05-27',
  },
  {
    key: 4,
    pkey: 2,
    name: `血常规(CBC、DIFF)五分类`,
    date: '2020-05-27',
  },
  {
    key: 5,
    pkey: 2,
    name: `肌酐测定`,
    date: '2020-05-27',
  },
  ];
const selectData = [];

export default {
  data() {
    return {
      data,
      data2,
      data22,
      selectData,
      columns,
      columns2,
      columns3,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      curSelectItem1:0
    };
  },
  mounted() {//mounted 是生命周期方法之一，会在对应生命周期时执行。
    if(data.length > 0) this.handlerItem1Click(data[0].key)
  },
  computed: {//
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
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handlerItem1Click(val){
      this.curSelectItem1=val
      console.log(val)
      this.data2 = this.data22.filter((item)=>{ return item.pkey === val})
    },
    handlerSelectChange(selectedRowKeys) {
      // console.log('selectedRows changed: ', selectedRows);
      this.selectData=[]
      this.data22.forEach(item=>{
        if(selectedRowKeys.includes(item.key)){
          let isExit = false
          this.selectData.forEach(obj =>{
            if(obj.key == item.key){isExit=true}
          })
          if(!isExit){this.selectData.push(item)}
        }
      })
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>