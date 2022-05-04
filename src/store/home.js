import { reqCategoryList,reqGetBannerList,reqGetFloorList } from "@/api"
//home模块小仓库
//准备actions对象——响应组件中用户的动作。可以写自己的业务逻辑以及处理异步
const actions = {
	//通过API里面的接口调用，向服务器发请求获取服务器数据
	async categoryList({commit}){
		//reqCategoryList()返回一个promise
		let result = await reqCategoryList();
		if(result.code==200){
			//提交mutations
			commit("CATEGORYLIST",result.data)
		}
	},
	//获取首页轮播图的数据
	async getBannerList({commit}){
		let result = await reqGetBannerList()
		if(result.code==200){
			//提交mutations
			commit("GETBANNERLIST",result.data)
		}
	},
	//获取floor数据
	async getFloorList({commit}){
		let result = await reqGetFloorList()
		if(result.code==200){
			//提交mutations
			commit("GETFLOORLIST",result.data)
		}
	},

}
//准备mutations对象——修改state中的数据
const mutations = {
	CATEGORYLIST(state,categoryList){
		state.categoryList = categoryList
		categoryList.length = 16
	},
	GETBANNERLIST(state,bannerList){
		state.bannerList = bannerList
	},
	GETFLOORLIST(state,floorList){
		state.floorList = floorList
	},
}

//准备state对象——保存具体的数据
const state = {
	//state中的数据类型取决于服务器请求返回的数据类型
	//home仓库中储存的三级数据
	categoryList:[],
	//轮播图的数据
	bannerList:[],
	//floor组件中的数据
	floorList:[]
	
}
//理解为计算属性，用于简化仓库数据，让组件获取仓库数据更方便
const getters = {}
//创建并暴露store
export default {
	namespaced:true,
	actions,
	mutations,
	state,
	getters
}