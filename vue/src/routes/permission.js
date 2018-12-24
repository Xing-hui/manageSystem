import router, { asyncRouterMap } from 'routes'
import store from 'store'
import { getToken } from 'assets/js/auth'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'  // Progress 进度条样式
import { getNavList } from 'api'

// 不重定向白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if ( getToken() ){ // 判断是否登录，成功登录
        if (to.path === '/login'){
            next('/')
        } else { // 判断是否已经动态生成了路由表
            if ( store.getters.navList.length == 0 ){
                // 获取应用导航列表
                const response = {"code":1,"data":[{"iconName":"icon-document","parent_id":"0","link":"/customer","id":"1","sort":1,"title":"员工管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"1","link":"","id":"2","sort":2,"title":"员工信息","type":null,"list":[{"iconName":"customer","parent_id":"2","link":"/customer/list","id":"3","sort":3,"title":"员工列表","type":null,"list":[]}]}]},{"iconName":"icon-tickets","parent_id":"0","link":"/product","id":"6","sort":6,"title":"出勤管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"6","link":"","id":"7","sort":7,"title":"出勤信息","type":null,"list":[{"iconName":"customer","parent_id":"7","link":"/product/category_list","id":"8","sort":8,"title":"出勤列表","type":null,"list":[]}]}]},{"iconName":"icon-sold-out","parent_id":"0","link":"/order","id":"11","sort":11,"title":"绩效管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"11","link":"","id":"12","sort":12,"title":"绩效信息","type":null,"list":[{"iconName":"customer","parent_id":"12","link":"/order/list","id":"13","sort":13,"title":"绩效列表","type":null,"list":[]}]}]},{"iconName":"icon-bell","parent_id":"0","link":"/price","id":"14","sort":14,"title":"消息管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"14","link":"","id":"15","sort":15,"title":"消息信息","type":null,"list":[{"iconName":"customer","parent_id":"15","link":"/price/list","id":"16","sort":16,"title":"消息列表","type":null,"list":[]}]}]},{"iconName":"icon-edit-outline","parent_id":"0","link":"/finance","id":"17","sort":17,"title":"工资管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"17","link":"","id":"18","sort":18,"title":"工资信息","type":null,"list":[{"iconName":"customer","parent_id":"18","link":"/finance/list","id":"19","sort":19,"title":"工资列表","type":null,"list":[]}]}]}],"defaultLink":"/customer"}
                // await getNavList()
                // {"code":1,"data":[{"iconName":"icon-document","parent_id":"0","link":"/customer","id":"1","sort":1,"title":"员工管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"1","link":"","id":"2","sort":2,"title":"员工信息","type":null,"list":[{"iconName":"customer","parent_id":"2","link":"/customer/list","id":"3","sort":3,"title":"员工列表","type":null,"list":[]}]}]},{"iconName":"icon-tickets","parent_id":"0","link":"/order","id":"4","sort":4,"title":"出勤管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"4","link":"","id":"5","sort":5,"title":"员工出勤","type":null,"list":[{"iconName":"customer","parent_id":"5","link":"/order/list","id":"6","sort":6,"title":"员工列表","type":null,"list":[]}]}]},{"iconName":"icon-sold-out","parent_id":"0","link":"/price","id":"7","sort":7,"title":"绩效管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"7","link":"","id":"8","sort":8,"title":"绩效考核","type":null,"list":[{"iconName":"customer","parent_id":"8","link":"/price/list","id":"9","sort":9,"title":"绩效列表","type":null,"list":[]}]}]},{"iconName":"icon-edit-outline","parent_id":"0","link":"/finance","id":"10","sort":10,"title":"工资管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"10","link":"","id":"11","sort":11,"title":"工资信息","type":null,"list":[{"iconName":"customer","parent_id":"11","link":"/finance/list","id":"12","sort":12,"title":"工资列表","type":null,"list":[]}]}]},{"iconName":"icon-bell","parent_id":"0","link":"/notice","id":"13","sort":13,"title":"消息管理","type":null,"list":[{"iconName":"icon-menu","parent_id":"13","link":"","id":"14","sort":14,"title":"消息信息","type":null,"list":[{"iconName":"customer","parent_id":"14","link":"/notice/list","id":"15","sort":15,"title":"消息列表","type":null,"list":[]}]}]}],"defaultLink":"/customer"}
                
                // 通过 vuex 管理导航数据
                store.dispatch('createNavList', response.data)
                store.dispatch('createRouterMap', response.data)
                // 生成可访问的路由表
                router.addRoutes(store.state.routerMap)
                // hack 方法 确保 addRoutes 已完成
                next({ ...to, replace: true })
            } else {
                next()
            }
        }
    } else { // 非登录
        if (whiteList.indexOf(to.path) !== -1){
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
