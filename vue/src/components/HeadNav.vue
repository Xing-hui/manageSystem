<template>
<nav class="head-nav">
   <ul class="clearFix">
        <li v-for="(item, key) in list" :key="key" :class="{active: path.indexOf(item.link) != -1}">
            <router-link :to="item.link">
                <i class="icon" :class="'graph-' + item.iconName"></i>
                <span>{{ item.title }}</span>
            </router-link>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    name: 'HeadNav',
    props: {
        list: {
            type: Array,
            default: []
        },
        path: {
            type: String,
            default: '/'
        }
    }
}
</script>

<style>
.head-nav ul li {
    float: left;
}
.head-nav ul li a {
    display: block;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}
.head-nav ul li a:hover,
.head-nav ul li.active a {
    background-color: #02aed9;
}
.head-nav ul li a i.icon {
    height: 16px;
    width: 16px;
    margin-top: -3px;
}
.head-nav ul li a span {
    margin-left: 6px;
    font-size: 16px;
    color: #fff;
}

/* 头部导航分类图标 */
.head-nav ul li a i.graph-icon-document {
    background-position: -112px -32px;
}
.head-nav ul li a i.graph-icon-goods {
    background-position: -32px 0;
}
.head-nav ul li a i.graph-icon-tickets {
    background-position: -64px 0;
}
.head-nav ul li a i.graph-icon-sold-out {
    background-position: -336px 0;
}
.head-nav ul li a i.graph-icon-edit-outline {
    background-position: -144px 0;
}
.head-nav ul li a i.graph-icon-setting {
    background-position: -240px 0;
}
.head-nav ul li a i.graph-icon-bell {
    background-position: -16px -32px;
}

</style>