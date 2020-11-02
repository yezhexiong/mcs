<template>
  <div class="my-viewfrom-comment">
    <a-spin tip="Loading..." :spinning="commentSpinning">
      <div class="comment-header">
        <span>会诊意见 (意见 2 评价1)</span>
        <span><a-button type="primary" size="small" @click="handlerTest">发表会诊意见</a-button></span>
      </div>
      <div class="comment-Content">
        <div
          class="comment-Content-item"
          v-for="item in dataComments"
          :key="item.wf_id"
        >
          <div>
            <a-avatar
              style="color: #f56a00; backgroundcolor: #fde3cf"
              :size="45"
              >叶</a-avatar
            >
          </div>
          <div class="comment-Content-item-right">
            <div class="comment-Content-item-right-top">
              <span>{{ item.wf_approvaluser }}</span
              ><span>{{ item.wf_approvaldept }}</span
              ><span>{{ item.wf_approvaldate }}</span>
            </div>
            <div class="comment-Content-item-right-body">
              {{ item.wf_opinion }}
            </div>
            <div class="comment-Content-item-right-bottom">
              <span>评论 2</span><span>+评论</span>
            </div>
            <div>
              <!-- <div>
                    <div><span>屈春晓</span><span>呼吸内科</span><span>2020/10/15 12:29</span></div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</div>
                </div> -->
              <div v-for="item2 in dataReplys" :key="item2.wfc_id">
                <div v-if="item2.wf_id === item.wf_id">
                  <hr />
                  分值：{{ item2.wfc_scoring }}
                  <div>
                    <span>医生：{{ item2.wfc_approvaluserid }}</span
                    ><span>科室：{{ item2.wfc_approvaldept }}</span
                    ><span>回复日期：{{ item2.wfc_approvaldate }}</span>
                  </div>
                  <div>回复内容：{{ item2.wfc_comment }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
export default {
  props: {
    //组件入参数定义,入参数参数不允许修改 定义props参数后调用，父组件传值方式 :title="xxxx" 或 title="xxxx"
    visible: Boolean, //a-modal 是否显示
    folio: Number, //主键
  },
  data() {
    return {
      action: null,
      dataComments: [], //评论意见
      dataReplys: [], //回复
      commentSpinning: false,
    };
  },
  watch: {
    folio: {
      handler() {
        this.title = "查看会诊申请单详细";
        this.loadData();
      },
      immediate: true, //启动首次监听
    },
  },
  methods: {
    loadData() {
      console.log("viewformcommentvue this.folio", this.folio);
      if (typeof this.folio !== "undefined" && this.folio !== "") {
        this.commentSpinning = true;
        //let url = this.$Api.Consultation.CommentList + "?folio=" + this.folio;
        let url = this.$Api.Consultation.CommentList + "?folio=39492";
        this.$Http.AsyncGet(url).then((res) => {
          this.dataComments = res.data.map((item) => {
            return item.workflowapprovallist;
          });

          this.dataReplys=[];
          res.data.forEach((element) => {
            element.workflowapprovalcomment.forEach((item) => {
              this.dataReplys.push(item);
            });
          });

          this.commentSpinning = false;
        });
      }
    },
    handlerTest(){
      console.log('this.tmplist=',this.tmplist)
       this.dataReplys.push({
          wf_id: 52,
          wfc_approvaldate: '2020-20-20',
          wfc_approvaldept: '研发部',
          wfc_approvaldeptname: '研发部',
          wfc_approvaluser: '张三',
          wfc_approvaluserid: '111 ',
          wfc_approvalusername: '张三',
          wfc_comment: 'asdasdffasdfadfadfadfasdfadsfadfadfadsfa',
          wfc_folio: '"39492"',
          wfc_id: 3333,
          wfc_scoring: '5',
       });
    },
  },
};
</script>
<style lang="less" scoped>
.my-viewfrom-comment {
  border-left: solid 1px #eee;
  padding-left: 15px;
  margin-left: 15px;
  height: 600px;
  .comment-header {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
  .comment-Content {
    overflow: hidden;
    padding-top: 10px;
    .comment-Content-item {
      display: flex;
      justify-content: space-around;
      .comment-Content-item-right {
        width: 340px;
        .comment-Content-item-right-top {
          height: 30px;
          display: flex;
          align-items: flex-end;
          font-size: 16px;
          span {
            padding-right: 9px;
          }
        }
        .comment-Content-item-right-body {
          font-size: 14px;
        }
        .comment-Content-item-right-bottom {
          display: flex;
          justify-content: space-between;
          border-top: solid 1px #eee;
          width: 100%;
          padding-top: 5px;
          margin-top: 5px;
          span {
            padding: 0 9px 0 9px;
          }
        }
      }
    }
  }
}
</style>
