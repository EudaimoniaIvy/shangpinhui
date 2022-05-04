import {reqSearchInfo} from "@/api"
//search模块小仓库
const actions = {
	//获取search模块的数据
	async searchInfo({commit},params={}){
		//params形参，dispatch时传递的参数，至少是一个空对象
		//函数reqSearchInfo（）调用时，参数至少需要一个空对象
		//（记录bug)let result = await reqSearchInfo({})没有接收参数获取的数据一直无变化
		let result = await reqSearchInfo(params)
		if(result.code == 200){
			commit("SEARCHINFO",result.data)
		}
	}
}
const mutations = {
	SEARCHINFO(state,searchObj){
		state.searchObj = searchObj
	}
}
const state = {
	searchObj:{}
}
//准备getters——用于将state中的数据进行加工(简化)
const getters = {
	//当前形参是state是当前小仓库的state
	goodsList(state){
		return state.searchObj.goodsList||[]
	},
	trademarkList(state){
		return state.searchObj.trademarkList||[]
	},
	attrsList(){
		return state.searchObj.attrsList||[]
	}
}
//创建并暴露store
export default {
	namespaced:true,
	actions,
	mutations,
	state,
	getters
}