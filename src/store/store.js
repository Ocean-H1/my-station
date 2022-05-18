import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 车站列表
        stationList: [],
        // 当前激活车站信息(地图页面)
        activeStation: {},
        // 用户的登录状态
        isLogin: false,
        // 用户权限
        isRoot: false,
        // 查询车票页面的状态
        searchStatus: {},
    },
    // 获取属性的状态
    getters: {
        // 获取登录状态
        isLogin: state => state.isLogin,
        // 获取权限状态
        isRoot: state => state.isRoot,
        // 获取车票查询页面的状态
        searchStatus: state => state.searchStatus
    },
    mutations: {
        // 修改车站信息为用户点击的车站
        setPosition(state, activeStation) {
            state.activeStation = activeStation
        },
        // 设置车站列表
        setStationList(state, list) {
            state.stationList = list
        },
        // 保存登录状态
        userStatus(state, flag) {
            state.isLogin = flag
        },
        // 保存用户权限
        userPermissions(state,flag) {
            state.isRoot = flag
        },
        // 设置车票查询页面的状态
        setSearchStatus(state,status){
            state.searchStatus = status
        },
    },
    actions: {
        // 设置登录状态
        userLogin({ commit }, flag) {
            commit('userStatus', flag)
        },
        // 设置权限状态
        setPermissions({commit},flag) {
            commit('userPermissions',flag)
        }
    },
})


