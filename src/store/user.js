import { reqGetCode, reqUserRegister, reqUserLogin,reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,removeToken} from "@/utils/token"
//登录和注册
const state = {
    code: '',
    token:getToken(),
    userInfo:{}
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //正常应该是获取验证码发送到用户手机
        let result = await reqGetCode(phone)
        //console.log(result)
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        //console.log(result)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //token登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //console.log(result)
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            //持久化储存token（可实现自动登录）
            //token已经是字符串了不用转换
            //localStorage.setItem("TOKEN",result.data.token)
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息（自动登录）
    async getUserInfo({ commit }){
        let result = await reqUserInfo()
        //console.log(result)
        //commit("GETUSERINFO", result.data)
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('fail'))
        } 
    },
    //退出登录
    async userLogout({commit}){
        //清除服务器token数据
        let result = await reqLogout()
        //action里不能操作数据
        if(result.code==200){
            commit("CLEAR")
            return "ok"
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = '';
        state.userInfo={};
        removeToken()
    }
}
const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}
