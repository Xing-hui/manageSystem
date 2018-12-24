<template>
    <main>
        <div class="wrapper">
          <!-- 导航栏 start -->
          <nav class="app-location-wrapper">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>出勤管理</el-breadcrumb-item>
              <el-breadcrumb-item>员工出勤</el-breadcrumb-item>
              <el-breadcrumb-item>员工列表</el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
          <!-- 导航栏 end -->
          <!-- 组件 start -->
            <!-- 组件top start -->
              <div class="component-top clearFix">
                <div class="search-title fl">员工姓名：</div>
                <el-input v-model="Sname" class="input" size="small"
                  placeholder="员工姓名"
                  @keyup.native.enter="toFilter"
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
                      label="签到时间">
                      <template slot-scope="scope">
                        {{ scope.row.SIGNINTIME }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="签到地点">
                      <template slot-scope="scope">
                        {{ scope.row.SIGNINPLACE }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="签退时间">
                      <template slot-scope="scope">
                        {{ scope.row.SIGNOFFTIME }}
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="签退地点">
                      <template slot-scope="scope">
                        {{ scope.row.SIGNOFFPLACE }}
                      </template>
                      </el-table-column>
                  </el-table>
              </div>
            <!-- 组件content end -->
          <!-- 组件 end -->
        </div>
    </main>
</template>

<script>
import {
  getWorkList
} from "api";
  export default {
    data() {
      return {
        tableData: [],
        Sname: '',
        loading: true,
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 列表-搜索
      toFilter() {
        this.getWorList();
      },
      // 获取列表
      async getWorList() {
        try {
          const response = await getWorkList({
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
    },
    created() {
    this.getWorList();
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
