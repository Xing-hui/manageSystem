/**
 * @Author: jzy
 * @Date: 2018/1/19
 * @Last Modified by:   jzy
 * @Last Modified time: 2018-08-31 15:45:09
 */
import Vue from 'vue'
import App from './App.vue'
import router from 'routes'
import store from 'store'
import 'routes/permission'
import _ from 'lodash'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})