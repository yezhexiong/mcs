<template>
  <div>
    <a-alert 
      banner 
      message="导入检查项"
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
        />
      </a-col>
      <a-col :span="9">
        <a-table
          size="small"
          :scroll="{ y: 600 }"
          :pagination="false"
          :columns="columns2"
          :data-source="data2"
        />
      </a-col>
      <a-col :span="9">
        <a-table
          size="small"
          :scroll="{ y: 600 }"
          :pagination="false"
          :columns="columns3"
          :data-source="data3"
        />
      </a-col>
    </a-row> 
    
    
    
  </div>
  <!-- <br>
  $attrs:{{$attrs}}
  <br>
  $props:{{$props}}
  <br>
  $listeners{{$listeners}} -->
</template>

<script>
// import {eventBus} from './thisEventBus'
// eventBus.$on('api-call',(param)=>{ console.log(param) });

const columns = [
  {
    title: '检验项目',
    dataIndex: 'name',
  }
];
const columns2 = [
  {
    title: '检验项',
    dataIndex: 'name1',
  },{
    title: '值',
    dataIndex: 'name2',
  },{
    title: '单位',
    dataIndex: 'name3',
  },{
    title: '参考',
    dataIndex: 'name4',
  }
];
const columns3 = [
  {
    title: '已选项目',
    dataIndex: 'name',
  }
];

const data = [
  {
    key: 1,
    name: `血常规(CBC、DIFF)五分类`,
    date: '2020-05-27',
  },
  {
    key: 1,
    name: `网织红细胞计数`,
    date: '2020-05-27',
  },
  {
    key: 1,
    name: `血清总蛋白测定`,
    date: '2020-05-27',
  },
  {
    key: 1,
    name: `血常规(CBC、DIFF)五分类`,
    date: '2020-05-27',
  },
  {
    key: 1,
    name: `肌酐测定`,
    date: '2020-05-27',
  },
  ];

const data2 = [];
for (let i = 0; i < 46; i++) {
  data2.push({
    name1: `白细胞计数${i}`,
    name2: `8.18 ${i}`,
    name3: `10^9L${i}`,
    name4: `4-10${i}`,
  });
}
const data3 = [];
for (let i = 0; i < 46; i++) {
  data3.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
export default {
  data() {
    return {
      data,
      data2,
      data3,
      columns,
      columns2,
      columns3,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };
  },
  computed: {
   
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>

<style>
/* .ant-divider, .ant-divider-vertical {
    height: 600px;
} */
/* .ant-col:not(:last-child){
  border-right:solid 1px #e8e8e8;
} */
/* .select-assay-modal .ant-modal-body {
  padding: 0!important;
} */
/* .my-table-col{
  overflow:overlay;height:600px;
} */
</style>
