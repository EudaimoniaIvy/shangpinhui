import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"

//detail模块小仓库
const actions = {
	//通过API里面的接口调用，向服务器发请求获取服务器数据
	async goodsInfo({commit},skuId){
		//获取产品信息
		let result = await reqGoodsInfo(skuId);
		if(result.code==200){
			//提交mutations
			commit("GOODSINFO",result.data)
		}
	},
	//将产品添加到购物车中
	async addOrUpdateShopCart({commit},{ skuId,skuNum }){
		//不需要在仓库中存储数据
		let result = await reqAddOrUpdateShopCart(skuId,skuNum);
		if(result.code==200){
			return "ok"
		}else{
			return Promise.reject(new Error('fail'))
		}
	}
}
//准备mutations对象——修改state中的数据
const mutations = {
	GOODSINFO(state,goodsObj){
		state.goodsObj = goodsObj
	},
}

//准备state对象——保存具体的数据
const state = {
	//state中的数据类型取决于服务器请求返回的数据类型
	goodsObj:{},
	
}
//理解为计算属性，用于简化仓库数据，让组件获取仓库数据更方便
const getters = {
	//简化导航路径区域（面包屑）
	categoryView(state){
		//categoryView也有可能是空对象要写||{}否则会报错
		return state.goodsObj.categoryView||{}
	},
	//简化产品信息的数据
	skuInfo(state){
		return state.goodsObj.skuInfo||{}
	},
	//产品售卖属性的简化
	spuSaleAttrList(state){
		return state.goodsObj.spuSaleAttrList
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