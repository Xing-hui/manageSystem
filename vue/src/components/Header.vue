<template>
<el-header class="app-header clearFix">
    <div class="app-head-logo fl">
        <router-link to="/">超市员工管理系统</router-link>
    </div>
    <div class="app-top-nav fl">
        <slot name="topnav"></slot>
    </div>
    <div class="user-setting fr">
        <DropdownMenu placement="right">
            <span slot="title">管理员</span>
            <div slot="list" class="user-setting-list">
                <ul>
                    <li @click="dialogFormVisible = true">
                        个人设置
                    </li>
                    <li @click.stop.native="">
                        安全退出
                    </li>
                </ul>
            </div>
        </DropdownMenu>
    </div>
    <el-dialog title="" :visible.sync="dialogFormVisible">
              <el-form :model="selfForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="selfForm.NAME" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                  <el-input v-model="selfForm.POST" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="selfForm.PHONE" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="selfForm.STAFFID" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="selfForm.PASSWORD" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePas">确 定</el-button>
              </div>
            </el-dialog>
</el-header>
</template>

<script>
import DropdownMenu from './DropdownMenu.vue'

import {
  getSelfInfo,updatePassword
} from "api";

export default {
    name: 'Header',
    data(){
        return {
            // 创建的弹窗
            dialogFormVisible: false,
            selfForm: {},
            formLabelWidth: '120px',
        }
    },
    methods: {
        // 查看个人信息
      async getSelInfo() {
        try {
          const response = await getSelfInfo({
            staffid: '1',
          });
          if (response.code == 1) {
            console.log(response)
            this.selfForm.NAME = response.data[0].NAME
            this.selfForm.POST = response.data[0].POST
            this.selfForm.PHONE = response.data[0].PHONE
            this.selfForm.STAFFID = response.data[0].STAFFID
            this.selfForm.PASSWORD = response.data[0].PASSWORD
            this.loading=false;
          } else {
            this.$message.error(response.message);
            this.loading=false;
          }
        } catch (err) {
          console.error(err);
          this.loading=false;
        }
        this.dialogFormVisible  = false
      },
        // 修改密码
      async updatePas() {
        try {
          const response = await updatePassword({
            staffid: this.selfForm.STAFFID,
            password: this.selfForm.PASSWORD
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
        this.dialogFormVisible  = false
      },
    },
    components: {
        DropdownMenu
    },
    created() {
    this.getSelInfo();
  },
}
</script>

<style>
.app-header {
    height: 50px;
    line-height: 50px;
    background-color: #2dc3e8;
}
.app-head-logo {
    width: 180px;
    color: #fff;
    font-size: 16px;
}
.app-head-logo a {
    color: #fff;
}

.user-setting {
    height: 50px;
}
.user-setting-list {
    padding: 6px 0;
}
.user-setting-list ul li {
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
}
.user-setting-list ul li:hover {
    background: #2dc3e8;
    color: #fff;
}
</style>