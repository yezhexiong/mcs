<template>
<div>
  <!-- a-table @change 分页、排序、筛选变化时触发 
  :pagination="false" 不显示分页
  -->
  <a-table 
    :columns="columns"
    :data-source="data" 
    :scroll="{ x: 1500}"
    :pagination="pagination"
    :loading="loading"
    size="small"
    @change="handleTableChange"
    >
    <template slot="ReceiveNumInfo" slot-scope="text, record">
       {{ record.receivenum+'/'+record.receiveall }}
    </template>
    <span slot="action" slot-scope="text, record">
      <template>
        <a @click="openForm({primaryKey:record.consulno,pat_status:record.pat_status})">详细</a>
      </template>
    </span>
  </a-table>
  <!-- EditForm组件props的visible控制窗体是否显示 visible.sync声明后 子组件即可通过 this.$emit('update:visible',false); 方式直接修改props变量-->
  <view-form
    ref="viewForm"
    :visible.sync="viewFormVisible"
    :init-data="formInitData"
  />  
</div>
</template>
<script>
import viewForm from '@/views/Consultation/ApprovalListViewForm'

const columns = [
  { title: '床号', width: 60, dataIndex: 'bedlabel', key: 'bedlabel', fixed: 'left' },
  { title: '住院号', dataIndex: 'inpno', key: 'age', fixed: 'left' },
  { title: '姓名', dataIndex: 'name', key: 'name',  fixed: 'left'},
  { title: '病区', dataIndex: 'visitinfowarname', key:'visitinfowarname'},
  { title: '会诊类型', dataIndex: 'consultationtype', key: 'consultationtype'},
  { title: '会诊科室', dataIndex: 'consultationdeptlist', key: 'consultationdeptlist', width:'300px', ellipsis: true},
  { title: '会诊医生', dataIndex: 'consultationdoclist', key: 'consultationdoclist', width:'150px', ellipsis: true},
  { title: '会诊目的', dataIndex: 'consultationpurpose', key: 'consultationpurpose', ellipsis: true},
  { title: '申请会诊时间', dataIndex: 'applydate', key: 'applydate',ellipsis: true, width:'200px'},
  { title: '会诊接收情况', key: 'receivenumInfo' ,scopedSlots: { customRender: 'receivenumInfo' },},
  { title: '会诊状态', dataIndex: 'pat_status', key: 'pat_status' },//,scopedSlots: { customRender: 'patStatus' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];


const data = [];

export default {
  components: {
    viewForm,
  },
  props: {//组件入参数定义,入参数参数不允许修改 定义props参数后调用，调用时就可以这样使用 :title="xxxx" 或 title="xxxx"
    queryParam: {},// 查询参数
  },
  data() {
    return {//放在return下面，不会产生污染
      //组件私有变量
      data,
      columns,
      pagination:{hideOnSinglePage:true,pageSize:10000},//hideOnSinglePage 只有页则不显示分页控件
      loading: true,
      viewFormVisible: false,
      formModel:{},
      formInitData:{},
    };
  },
  mounted() {//mounted 是生命周期方法之一，会在对应生命周期时执行。
    this.fetch();
  },
  watch: {
    queryParam: {
      handler() {
        this.fetch();
      },
      deep: true,//监听对象时，需要开启
      // immediate: true
    }
  },
  methods: {
    //a-table @change 分页、排序、筛选变化时触发
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    //获取数据
    fetch() {
      this.loading = true;
      // let getParams = {
      //   results: 10,
      //   ...params,
      // };
      // let postParams = "?applyuser="+this.$GlobalData.LoginUserInfo.userName;//000324
      // if(Object.keys(this.queryParam).length!=0){
      //   getParams += "&patStatus="+ this.queryParam.status; toDate
      // }
      let postParams = {
        "starttime": this.queryParam.applyDateRegion[0].format("YYYY-MM-DD"),
        "endtime": this.queryParam.applyDateRegion[1].format("YYYY-MM-DD"),
        ...this.queryParam,
      };

      this.$Http.AsyncPost(this.$Api.Consultation.ApprovalList,postParams).then(res => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 1;
          this.loading = false;
          for(let index in res.data){
            let entity = res.data[index]
            entity.pat_status = this.$GlobalDict.Consultation.ApprovalStatus.FormatDict(entity.pat_status)
          }
          
          this.data = res.data;
          this.pagination = pagination;
      });
    },
    /**  */
    openForm(obj={}) {
      this.formInitData=obj;
      this.viewFormVisible = true;
    },
  },
};
</script>
