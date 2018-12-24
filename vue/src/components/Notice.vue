<template>
    <main>
        <div class="wrapper">
          <!-- 导航栏 start -->
          <nav class="app-location-wrapper">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>消息管理</el-breadcrumb-item>
              <el-breadcrumb-item>消息信息</el-breadcrumb-item>
              <el-breadcrumb-item>消息列表</el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
          <!-- 导航栏 end -->
          <!-- 组件 start -->
            <!-- 组件top start -->
              <div class="component-top clearFix">
                <el-button class="fl" size="small" type="primary" plain @click="self">仅自己</el-button>
                <el-button class="fl" size="small" type="primary" plain @click="all">全部</el-button>
              </div>
            <!-- 组件top end -->
            <!-- 组件content start -->
              <div class="component-content">
                  <el-table
                    :data="tableData"
                    style="width: 100%" border>
                    <el-table-column
                      label="id"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.NOTICEID }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="发送者id"
                      min-width="250">
                      <template slot-scope="scope">
                        {{ scope.row.SENDERID }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="接收者id"
                      min-width="250">
                      <template slot-scope="scope">
                        {{ scope.row.RECEIVERID }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="内容"
                      width="120">
                      <template slot-scope="scope">
                        {{ scope.row.NOTICECONTENT }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="日期"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.CREATETIME }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="类型"
                      width="200">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.NOTICETYPE == '1'" type="primary" plain>请假</el-tag>
                        <el-tag v-if="scope.row.NOTICETYPE == '2'" type="primary" plain>建议</el-tag>
                        <el-tag v-if="scope.row.NOTICETYPE == '3'" type="primary" plain>赏罚</el-tag>
                        <el-tag v-if="scope.row.NOTICETYPE == '4'" type="primary" plain>通知</el-tag>
                      </template>
                      </el-table-column>
                    <el-table-column label="操作" width="280">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="success"
                          @click="handleAgree(scope.$index, scope.row)">发送消息</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
              </div>
            <!-- 组件content end -->
          <!-- 组件 end -->

          <!-- 通知员工的弹窗 -->
                  <el-dialog title="通知员工" :visible.sync="dialogFormVisible3">
                    <el-form :model="noticeForm">
                      <el-form-item label="通知id" :label-width="formLabelWidth">
                        <el-input v-model="noticeForm.noticeid" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="接收人id" :label-width="formLabelWidth">
                        <el-input v-model="noticeForm.receiver_id" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="发送人id" :label-width="formLabelWidth">
                        <el-input v-model="noticeForm.sender_id" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="创建时间" :label-width="formLabelWidth">
                        <el-input v-model="noticeForm.Createtime" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="通知内容" :label-width="formLabelWidth">
                        <el-input v-model="noticeForm.Noticecontent" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                      <el-button type="primary" @click="sentNot">确 定</el-button>
                    </div>
                  </el-dialog>
        </div>
    </main>
</template>

<script>
import {
  getNoticeList,sentNotice
} from "api";
  export default {
    data() {
      return {
        tableData: [],
        Sname: '',
        Stype: '',
        Sid: '',
        dialogFormVisible3: false,
        noticeForm: {},
        formLabelWidth: '120px',
      }
    },
    methods: {
      self() {
        this.Sid = '1'
        this.getNotList()
      },
      all() {
        this.Sid = ''
        this.getNotList()
      },
      // 列表-搜索
      toFilter() {
        this.getNotList();
      },
      handleAgree(index, row) {
        console.log(index, row);
        var myDate = new Date();
        var date = myDate.toLocaleString( );
        this.noticeForm.receiver_id = row.SENDERID
        this.noticeForm.sender_id = row.RECEIVERID
        this.noticeForm.Createtime = date
        this.dialogFormVisible3 = true
      },
      // 获取列表
      async getNotList() {
        try {
          const response = await getNoticeList({
            name: this.Sname,
            status: this.Stype,
            id: this.Sid
          });
          if (response.code == 1) {
            console.log(response)
            this.tableData = response.data;
            this.loading=false;
          } else {
            this.$message.error(response.message);
            this.loading=false;
          }
        } catch (err) {
          console.error(err);
          this.loading=false;
        }
      },
      // 发送消息
      async sentNot() {
        console.log(this.noticeForm)
        try {
          const response = await sentNotice({
            noticeid: this.noticeForm.noticeid,
            receiver_id: this.noticeForm.receiver_id,
            sender_id: this.noticeForm.sender_id,
            Createtime: this.noticeForm.Createtime,
            noticetype: '1',
            Noticecontent: this.noticeForm.Noticecontent,
          });
          if (response.code == 1) {
            console.log(response)
            this.loading=false;
          } else {
            this.$message.error(response.message);
            this.loading=false;
          }
        } catch (err) {
          console.error(err);
          this.loading=false;
        }
        this.getNotList();
        this.dialogFormVisible3 = false
      },
    },
    created() {
    this.getNotList();
  },
  }
</script>
<style>
/*通用样式 start*/
.main {
  background: #f2f2f2;
  overflow: hidden;
}
.wrapper {
  background: #fff;
  min-height: 300px;
}
.margin-right-10 {
  margin-right: 10px;
}
/*通用样式 end*/
/*面包屑栏样式 start*/
.app-location-wrapper{
  padding: 15px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
}
/*面包屑栏样式 end*/
/*组件样式 start*/
/*组件top样式 start*/
.component-top{
  padding: 15px;
}
.component-top .search-title{
  line-height: 32px;
  margin-right: 5px;
}
.component-top .input{
  width: 200px;
}
/*组件top样式 end*/
/*组件content样式 start*/

/*组件content样式 end*/
/*组件bottom样式 start*/
.component-bottom{
  margin:20px 0;
  text-align: center;
}
/*组件bottom样式 end*/
/*组件样式 end*/
</style>
