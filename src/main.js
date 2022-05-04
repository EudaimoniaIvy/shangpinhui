//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入三级联动组件
//全局引入，不需要在子组件重复引入
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox,Message } from 'element-ui';
//引入轮播样式
import 'swiper/css/swiper.css';

import '@/mock/mockServe'
//引入store
import store from './store'
//引入注册组件的表单验证插件（全局）
import '@/plugins/valadiate'

//统一接口api文件夹里全部请求函数
import * as API from '@/api'
//console.log(API)

//引入懒加载插件
import VueLazyload from 'vue-lazyload'
import loadImg from '@/assets/1.gif'

//注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)
//注册饿了么ui组件
Vue.component(Button.name, Button);
//另外一种注册方式，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件 
//下面这行也可以写在router/index.js里，但是要在router/index.js引入一次Vue
//但是vuex必须先在store里引入vuex然后在main.js里引入store
Vue.use(VueRouter)
Vue.use(VueLazyload,{
	//懒加载默认的图片
	loading:loadImg
})

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	//配置全局事件总线
	//要在数据代理之前配置上，所以在beforeCreate
	beforeCreate(){
		Vue.prototype.$bus = this
		//不用vuex的方法
		Vue.prototype.$API = API
	},
  //router要小写
	router:router,
	//组件实例的身上会多一个属性$store属性
	store
})
