<template>
    <el-menu router unique-opened class="app-sidebar-menu" 
        :default-active="path"
        background-color="#273240" 
        text-color="#fff" 
        active-text-color="#ffd04b">
        <el-submenu v-for="val in list" :key="val.title" :index="val.title">
            <template slot="title">
                <i :class="'el-' + val.iconName"></i>
                <span>{{ val.title }}</span>
            </template>
            <el-menu-item v-for="item in val.list" :key="item.link" :index="item.link">
                {{ item.title }}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        list: Array,
        path: String
    }
}
</script>

<style>
.app-sidebar-menu {
    border-right: none;
}
</style>