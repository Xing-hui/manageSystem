import axios from 'axios'
import qs from 'qs'
import common from 'assets/js/common'
import { Message } from 'element-ui'

console.info(common.env)
console.log(common.serverUrl)


const instance = axios.create({
    baseURL: common.serverUrl,
    timeout: 4000,
    // withCredentials: true, // 跨域请求时是否需要使用凭证
    paramsSerializer: params => {
        // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
        return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    transformRequest: [data => {
        // 在向服务器发送前修改请求数据，只适用于 POST
        return qs.stringify(data, { arrayFormat: 'repeat' })
    }],
    headers: {
        post: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
})

// http 请求拦截器
instance.interceptors.request.use(config => {
    // 
    return config
}, error => {
    Message.error('请求超时！')
    return Promise.reject(error)
})

// http 响应拦截器
instance.interceptors.response.use(response => {
    return response.data
}, error => {
    Message.error(error.response.data || '数据加载失败！')
    return Promise.reject(error)
})

/**
 * 向后台请求数据的 API 接口
 */

// 登录接口
export const doLogin = params => instance.get(common.serverUrl + 'hrms/msg/pc/login/pc_login', {params})

// 获取应用导航接口
export const getNavList = () => instance.get('http://59.110.152.54/wxapi/mgr/menu/')

// 获取员工列表
export const getStaffList = params => instance.get(common.serverUrl + 'hrms/mgr/staffList/staff_lis', {params})

// 修改员工
export const modifyStaffList = params => instance.get(common.serverUrl + 'hrms/mgr/modifyStaff/Modify_personal_information', {params})

// 录入员工
export const addStaff = params => instance.get(common.serverUrl + 'hrms/mgr/addStaff/input_personal_information', {params})

// 删除员工
export const deleteStaff = params => instance.get(common.serverUrl + 'hrms/mgr/deleteStaff/dims', {params})

// 向员工发送消息
export const sentNotice = params => instance.get(common.serverUrl + 'hrms/mgr/checkLeave/resend_message', {params})

// 奖惩员工
export const rewardStaff = params => instance.get(common.serverUrl + 'hrms/mgr/addPerformence/per_input', {params})

// 获取出勤列表
export const getWorkList = params => instance.get(common.serverUrl + 'hrms/mgr/workList/signinlist', {params})

// 获取绩效列表
export const getPerformanceList = params => instance.get(common.serverUrl + 'hrms/mgr/performenceList/perf_list', {params})

// 获取消息列表
export const getNoticeList = params => instance.get(common.serverUrl + 'hrms/mgr/noticeList/notice_list', {params})

// 获取工资列表
export const getWageList = params => instance.get(common.serverUrl + 'hrms/mgr/wageList/staff_lis', {params})

// 修改工资
export const updateWage = params => instance.get(common.serverUrl + 'hrms/mgr/updateWage/change', {params})

// 获取个人信息
export const getSelfInfo = params => instance.get(common.serverUrl + 'hrms/mgr/mgrInfo/Modify', {params})

// 修改密码
export const updatePassword = params => instance.get(common.serverUrl + 'hrms/mgr/updatePassword/change_password', {params})