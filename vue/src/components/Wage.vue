<template>
    <main>
        <div class="wrapper">
          <!-- 导航栏 start -->
          <nav class="app-location-wrapper">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>工资管理</el-breadcrumb-item>
              <el-breadcrumb-item>工资信息</el-breadcrumb-item>
              <el-breadcrumb-item>工资列表</el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
          <!-- 导航栏 end -->
          <!-- 组件 start -->
            <!-- 组件top start -->
              <div class="component-top clearFix">
                <div class="search-title fl">员工姓名：</div>
                <el-input class="input" size="small" v-model="Sname"
                  placeholder="员工姓名"
                  prefix-icon="el-icon-search">
                </el-input>
              </div>
            <!-- 组件top end -->
            <!-- 组件content start -->
              <div class="component-content">
                  <el-table
                    :data="tableData"
                    style="width: 100%" border>
                    <el-table-column
                      label="id">
                      <template slot-scope="scope">
                        {{ scope.row.STAFFID }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="姓名">
                      <template slot-scope="scope">
                        {{ scope.row.NAME }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="电话">
                      <template slot-scope="scope">
                        {{ scope.row.PHONE }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="岗位">
                      <template slot-scope="scope">
                        {{ scope.row.POST }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="工时">
                      <template slot-scope="scope">
                        {{ scope.row.WORKTIME }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="时薪">
                      <template slot-scope="scope">
                        {{ scope.row.HOURWAGE }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="工资（工时*时薪）">
                      <template slot-scope="scope">
                        {{ scope.row.WAGE }}
                      </template>
                      </el-table-column>
                    <el-table-column label="操作" width="280">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="primary"
                          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
              </div>
            <!-- 组件content end -->
            <el-dialog title="修改工资" :visible.sync="dialogFormVisible">
              <el-form :model="updateForm">
                <el-form-item label="员工id" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.staffid" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="时薪" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.hourwage" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateWag">确 定</el-button>
              </div>
            </el-dialog>
          <!-- 组件 end -->
        </div>
    </main>
</template>

<script>
import {
  getWageList,updateWage
} from "api";
  export default {
    data() {
      return {
        tableData: [],
        Sname: '',
        updateForm: {},
        dialogFormVisible: false,
        formLabelWidth: '120px',
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.updateForm.staffid = row.STAFFID
        this.dialogFormVisible = true
      },
      // 获取列表
      async getWagList() {
        try {
          const response = await getWageList({
            name: this.Sname
          });
          if (response.code == 1) {
            console.log(response)
            this.tableData = response.data;
            for(var i = 0; i < this.tableData.length; i++){
              this.tableData[i].WAGE = this.tableData[i].HOURWAGE * this.tableData[i].WORKTIME
            }
            console.log(this.tableData)
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
      // 修改时薪
      async updateWag() {
        try {
          const response = await updateWage({
              staffid: this.updateForm.staffid,
              hourwage: this.updateForm.hourwage,
          });
          if (response.code == 1) {
            console.log(response)
            console.log(this.tableData)
            this.loading=false;
          } else {
            this.$message.error(response.message);
            this.loading=false;
          }
        } catch (err) {
          console.error(err);
          this.loading=false;
        }
        this.dialogFormVisible = false
        this.updateForm = {}
        this.getWagList()
      },

    },
    created() {
    this.getWagList();
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
