/**
 * @Author: jzy
 * @Date: 2017/9/19
 * @Last Modified by:   jzy
 * @Last Modified time: 2018-08-31 13:59:31
 */
import * as types from './types'
import { setToken } from 'assets/js/auth'
import { constantRouterMap, asyncRouterMap } from 'routes'

// 生成路由列表方法
const GenerateRoutes = (routesMap, navList) => {
    const routes = routesMap.filter(item => {
        if (navList.some(val => item.name === val.title)){
            return item
        }
    })

    routes.forEach(item => {
        let _arr = []
        let element = navList.find(val => val.title === item.name)
        element.list.forEach(val => {_arr = _arr.concat(val.list)})
        for (let i = 0; i < item.children.length; i++){
            if (item.children[i].path != '' && !(_arr.some(val => item.children[i].name === val.title))){
                item.children.splice(i, 1)
                i--
            }
        }
    })

    routes.push({ path: '*', redirect: '/' })

    return routes
}

const actions = {
    createLoginInfo ({commit}, params){
        setToken(params.id)
        commit({
            type: types.LOGININFO,
            info: params
        })
    },
    createNavList ({commit}, params){
        commit({
            type: types.NAVLIST,
            info: params
        })
    },
    createRouterMap ({commit}, params){
        commit({
            type: types.ROUTERMAP,
            info: GenerateRoutes(asyncRouterMap, params)
        })
    }
}

export default actions