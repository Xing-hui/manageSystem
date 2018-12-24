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
            <!-- todo: 操作变为下拉框 -->
            <el-button class="fr" size="small" type="primary" plain>操作</el-button>
          </nav>
          <!-- 导航栏 end -->
          <!-- 组件 start -->
            <!-- 组件top start -->
              <div class="component-top clearFix">
                <div class="search-title fl">员工姓名：</div>
                <el-input class="input" size="small"
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
                      label="id"
                      width="100">
                      <template slot-scope="scope">
                        <!-- {{ scope.row.id }} -->
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="登录密码"
                      min-width="250">
                      <template slot-scope="scope">
                        
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="姓名"
                      width="120">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="性别"
                      width="100">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="年龄"
                      width="200">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="部门"
                      width="100">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="电话"
                      width="100">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="岗位"
                      width="100">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="薪资"
                      width="100">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="入职时间"
                      width="100">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                      <el-table-column
                      label="权限"
                      width="100">
                      <template slot-scope="scope">
                        
                      </template>
                      </el-table-column>
                    <el-table-column label="操作" width="280">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="warning"
                          @click="handleEdit(scope.$index, scope.row)">奖惩</el-button>
                          <el-button
                          size="mini"
                          type="primary"
                          @click="handleEdit(scope.$index, scope.row)">通知</el-button>
                        <el-button
                          size="mini"
                          type="info"
                          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">离职</el-button>
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
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
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
