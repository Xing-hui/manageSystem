/**
 * @Author: jzy
 * @Date: 2017/9/19
 * @Last Modified by: jzy
 * @Last Modified time: 2017/9/19
 */
import * as types from './types'

const mutations = {
    [types.LOGININFO](state, payload){
        state.loginInfo = payload.info
    },
    [types.NAVLIST](state, payload){
        state.navList = payload.info
    },
    [types.ROUTERMAP](state, payload){
        state.routerMap = payload.info
    }
}

export default mutations