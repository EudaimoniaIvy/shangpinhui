//当前这个：API模块统一管理
import requests from './ajax'
import mockRequests from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList  get 无参数
//发请求:axios发请求返回的是Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
//获取banner（home首页轮播图接口
export const reqGetBannerList = ()=>mockRequests({url:'/banner',method:'get'});
//获取floor数据
export const reqGetFloorList = ()=>mockRequests({url:'/floor',method:'get'});
//获取搜索模块的数据，地址：/api/list请求方式post,需要带参数
//params至少是一个空对象(给服务器一个默认参数否则请求会报错)
export const reqSearchInfo = (params)=>requests({url:'/list',method:'post',data:params});
//获取产品详细信息的接口，/api/item/{ skuId }请求方式GET
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${ skuId }`,method:'get'});

//将产品添加到购物车中（获取更新产品的个数）
//api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'});

//获取购物车列表的接口
// /api/cart/cartList
export const reqShopCartList = ()=>requests({url:'/cart/cartList',method:'get'});

//删除购物车产品的接口
// /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCartChecked = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//获取验证码接口
// /api/user/passport/sendCode/phone
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册
// /api/user/passport/register post请求
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});

//登录
// /api/user/passport/login post请求
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});

//获取用户信息
// /api/user/passport/auth/getUserInfo get请求
export const reqUserInfo= (data)=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录
// /api/user/passport/logout get请求
export const reqLogout= ()=>requests({url:'/user/passport/logout',method:'get'});

//获取订单交易页信息
// /api/user/userAddress/auth/findUserAddressList get请求
//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取订单交易信息
// /api/order/auth/trade
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo} post请求
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取订单支付信息 get请求
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//获取支付订单状态 get请求
// /api/payment/weixin/queryPayStatus/{orderId} 
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心订单
// //api/order/auth/{page}/{limit} get
export const reqMyOderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});
