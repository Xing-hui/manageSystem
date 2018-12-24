<template>
    <main>
        <div class="wrapper">
          <!-- 导航栏 start -->
          <nav class="app-location-wrapper">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>员工管理</el-breadcrumb-item>
              <el-breadcrumb-item>员工信息</el-breadcrumb-item>
              <el-breadcrumb-item>员工列表</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button class="fr" size="small" type="primary" plain @click="dialogFormVisible = true" >录入员工</el-button>

            <el-dialog title="录入员工" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="员工id" :label-width="formLabelWidth">
                  <el-input v-model="form.staffid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-input v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                  <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                  <el-input v-model="form.department" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="岗位" :label-width="formLabelWidth">
                  <el-input v-model="form.job" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                  <el-input v-model="form.departmentnumber" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSta">确 定</el-button>
              </div>
            </el-dialog>
          </nav>
          <!-- 导航栏 end -->
          <!-- 组件 start -->
            <!-- 组件top start -->
              <div class="component-top clearFix">
                <div class="search-title fl">员工姓名：</div>
                <el-input v-model="Sname" class="input" size="small"
                  @keyup.native.enter="toFilter"
                  placeholder="员工姓名"
                  prefix-icon="el-icon-search">
                </el-input>
              </div>
            <!-- 组件top end -->
            <!-- 组件content start -->
              <div class="component-content">
                  <el-table
                    stripe
                    border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      label="id"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.STAFFID }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="登录密码"
                      min-width="250">
                      <template slot-scope="scope">
                        {{ scope.row.PASSWORD }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="姓名"
                      width="120">
                      <template slot-scope="scope">
                        {{ scope.row.NAME }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="性别"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.GENDER }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="年龄"
                      width="200">
                      <template slot-scope="scope">
                        {{ scope.row.AGE }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="部门"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.DEPARTMENT }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="电话"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.PHONE }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="岗位"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.POST }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="入职时间"
                      width="100">
                      <template slot-scope="scope">
                        {{ scope.row.WORKTIME }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="权限"
                      width="100">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.DEPARTMENTNUMBER == '0'" type="primary" plain>经理</el-tag>
                        <el-tag v-if="scope.row.DEPARTMENTNUMBER == '1'" type="primary" plain>人事</el-tag>
                        <el-tag v-if="scope.row.DEPARTMENTNUMBER == '2'" type="primary" plain>财务</el-tag>
                        <el-tag v-if="scope.row.DEPARTMENTNUMBER == '3'" type="primary" plain>行政</el-tag>
                        <el-tag v-if="scope.row.DEPARTMENTNUMBER == '4'" type="primary" plain>普通员工</el-tag>
                      </template>
                      </el-table-column>
                    <el-table-column label="操作" width="350" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="warning"
                          @click="handleReward(scope.$index, scope.row)">奖惩</el-button>
                          <el-button
                          size="mini"
                          type="primary"
                          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                          size="mini"
                          type="info"
                          @click="handleNotice(scope.$index, scope.row)">通知</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">离职</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <!-- 奖惩员工的弹窗 -->
                  <el-dialog title="奖惩员工" :visible.sync="dialogFormVisible2">
                    <el-form :model="rewardForm">
                      <el-form-item label="员工id" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.staffid" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.name" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.sex" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="年龄" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.age" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.phone" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="部门" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.department" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="岗位" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.job" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="奖惩id" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.perid" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="奖惩原因" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.p_comment" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="奖惩类型" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.performence" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="金额" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.number" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="奖罚时间" :label-width="formLabelWidth">
                        <el-input v-model="rewardForm.date" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                      <el-button type="primary" @click="rewardSta">确 定</el-button>
                    </div>
                  </el-dialog>

                  <!-- 修改员工的弹窗 -->
                  <el-dialog title="修改员工" :visible.sync="dialogFormVisible1">
                    <el-form :model="modifyForm">
                      <el-form-item label="员工id" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.staffid" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.password" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.name" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.sex" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="年龄" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.age" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.phone" autocomplete="off" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="部门" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.department" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="岗位" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.job" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="权限" :label-width="formLabelWidth">
                        <el-input v-model="modifyForm.departmentnumber" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                      <el-button type="primary" @click="modifySta">确 定</el-button>
                    </div>
                  </el-dialog>
              </div>

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
                        <el-input v-model="noticeForm.Createtime" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="通知类型" :label-width="formLabelWidth">
                        <el-input v-model="noticeForm.noticetype" autocomplete="off"></el-input>
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

              <!-- 删除员工 -->
              <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>您确定要离职该员工么？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="deleteSta">确 定</el-button>
                </span>
              </el-dialog>
            <!-- 组件content end -->
          <!-- 组件 end -->
        </div>
    </main>
</template>

<script>
import {
  getStaffList,addStaff,modifyStaffList,deleteStaff,rewardStaff,sentNotice
} from "api";

  export default {
    data() {
      return {
        tableData: [],
        loading: true,
        Sname: '',
        // 创建的弹窗
        dialogFormVisible: false,
        // 修改的弹窗
        dialogFormVisible1: false,
        // 奖惩的弹窗
        dialogFormVisible2: false,
        // 通知的弹窗
        dialogFormVisible3: false,
        // 删除的弹窗
        dialogVisible: false,
        form: {},
        formLabelWidth: '120px',
        modifyForm: {},
        rewardForm: {},
        noticeForm: {},
        deleteid: ''
      }
    },
    methods: {
      handleReward(index, row) {
        var myDate = new Date();
        var date = myDate.toLocaleString( );
        console.log(index, row);
        this.rewardForm.staffid = row.STAFFID
        this.rewardForm.password = row.PASSWORD
        this.rewardForm.sex = row.GENDER
        this.rewardForm.phone = row.PHONE
        this.rewardForm.age = row.AGE
        this.rewardForm.name = row.NAME
        this.rewardForm.department = row.DEPARTMENT
        this.rewardForm.job = row.POST
        this.rewardForm.departmentnumber = row.DEPARTMENTNUMBER
        this.rewardForm.date = date
        this.dialogFormVisible2 = true
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.modifyForm.staffid = row.STAFFID
        this.modifyForm.password = row.PASSWORD
        this.modifyForm.sex = row.GENDER
        this.modifyForm.phone = row.PHONE
        this.modifyForm.age = row.AGE
        this.modifyForm.name = row.NAME
        this.modifyForm.department = row.DEPARTMENT
        this.modifyForm.job = row.POST
        this.modifyForm.departmentnumber = row.DEPARTMENTNUMBER
        this.dialogFormVisible1 = true
      },
      handleNotice(index, row) {
        var myDate = new Date();
        var date = myDate.toLocaleString( );
        console.log(index, row);
        this.noticeForm.receiver_id = row.STAFFID
        this.noticeForm.sender_id = '1'
        this.noticeForm.Createtime = date
        this.dialogFormVisible3 = true
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.deleteid = row.STAFFID
        this.dialogVisible = true
      },
      // 列表-搜索
      toFilter() {
        this.getStaList();
      },
      // 获取列表
      async getStaList() {
        try {
          const response = await getStaffList({
            name: this.Sname
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
      // 录入员工
      async addSta() {
        var myDate = new Date();
        var date = myDate.toLocaleString( );
        try {
          const response = await addStaff({
            staffid: this.form.staffid,
            password: this.form.password,
            sex: this.form.sex,
            phone: this.form.phone,
            age: this.form.age,
            name: this.form.name,
            hourwage: 0,
            worktime1: 0,
            W_CREATETIME: date,
            department: this.form.department,
            job: this.form.job,
            departmentnumber: this.form.departmentnumber,
            worktime: date
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
        this.getStaList();
        this.dialogFormVisible = false
        this.form = {}
      },
      // 修改员工
      async modifySta() {
        try {
          const response = await modifyStaffList({
            staffid: this.modifyForm.staffid,
            department: this.modifyForm.department,
            job: this.modifyForm.job,
            departmentnumber: this.modifyForm.departmentnumber
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
        this.getStaList();
        this.dialogFormVisible1 = false
        this.modifyForm = {}
      },
      // 删除员工
      async deleteSta() {
        try {
          const response = await deleteStaff({
            staffid: this.deleteid,
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
        this.getStaList();
        this.dialogVisible = false
      },
      // 奖惩员工
      async rewardSta() {
        
        try {
          const response = await rewardStaff({
            staffid: this.rewardForm.staffid,
            perid: this.rewardForm.perid,
            performence: this.rewardForm.performence,
            number: this.rewardForm.number,
            p_comment: this.rewardForm.p_comment,
            p_time: this.rewardForm.date,
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
        this.getStaList();
        this.dialogFormVisible2 = false
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
            noticetype: this.noticeForm.noticetype,
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
        this.getStaList();
        this.dialogVisible3 = false
      },
    },
    created() {
    this.getStaList();
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
