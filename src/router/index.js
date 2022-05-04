// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
import routes from "./routes"
//引入store
import store from '@/store'

//先把VueRouter原型对象的push|replace保存一份
let originalPush = VueRouter.prototype.push
let originalReplace = VueRouter.prototype.replace

//重写push和replace
//因为push或者replace返回的是一个promise,所以要传入相应的成功和失败的回调
//this.$router属性是VueRouter类的一个实例，是注册路由的时候给组件实例添加的
//push也是VueRouter的一个实例（？）
//第一个参数：push跳转位置.第二个参数是成功的回调。第三个参数是失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
	if (resolve && reject) {
		//函数对象的apply与call的区别?
		//相同点:都可以改变函数的上下文一次，而且函数会立即执行一次
		//不同：函数执行的时候，传递参数不同，apply需要的是数组，call传递参数的时候用逗号隔开
		//原始的push方法可以进行路由跳转，但是需要保证上下文this是VueRouter类的实例
		//第一种情况：外部在使用push的时候传递成功与失败的回调
		//函数(也就是原型对象push)的上下文是VueRouter的一个实例(this.$router)所以用call
		//this.$router.push()
		originalPush.call(this, location, resolve, reject);
	} else {
		//第二种情况：外部在使用push方法的时候没有传递成功与失败的回调函数
		originalPush.call(this, location, () => { }, () => { });
	}
}

VueRouter.prototype.replace = function (location, resolve, reject) {
	if (resolve && reject) {
		originalReplace.call(this, location, resolve, reject);
	} else {
		originalReplace.call(this, location, () => { }, () => { });
	}
}

//创建一个路由器
const router = new VueRouter({
	//Kv一致，v的值在routes.js里面
	routes,
	//滚动行为
	scrollBehavior(to, from, savedPosition) {
		return { y: 0 } //期望滚动到哪个的位置(这里是顶端)
	}
})

//全局守卫
//记录bug，如果创建路由器和暴露简写在一起会报错，因为没有定义router
router.beforeEach(async (to, from, next) => {
	//console.log('前置路由守卫',to, from, next)
	//next("/")放行到指定路由
	//next(false)如果浏览器的url改变，地址重置到from对应地址
	//用户登录才有token
	//记录bug，store分模块不能直接写store.state.token
	let token = store.state.user.token
	//console.log(token)
	if (token) {
		//如果已登录，且要去Login页面，不可再去login界面
		if (to.path == '/login') {
			next('/home')
			//console.log('已登录但是要去Login')
		} else {
			//已登录但是去的不是Login
			try {
				//代表用户登录了，但是没有用户信息，发请求让仓库存储用户信息（让显示head的登陆信息），在进行路由跳转 
				await store.dispatch('user/getUserInfo');
				//该去哪里去哪里
				next();
			} catch (error) {
				//token过期失效了:清除本地的token（过期的）
				//token有时效
				await store.dispatch('user/userLogout');
				//清除本地数据之后，让用户回到登录页，重新登录、获取新的token
				next('/login')
			}
		}
	} else {
		//未登录时，不能去交易相关，支付相关，个人中心，去了就跳转到登录页
		//其他的放行
		//直接判断字符串
		/* if(to.path.indexOf('/trade')!=-1 || to.path.indexOf('/pay')!=-1 || to.path.indexOf('/center')!=-1){
			next('/login')
		}else{
			next()
		} */
		//用meta判断
		if(to.meta.isAuth){
			next()
		}else{
			//把用户登录之前想去的路由地址储存一下
			//然后在Login组件判断并且跳转
			next(`/login?redirect=${to.path}`)
		}
	}
})

//暴露
export default router
localStorage