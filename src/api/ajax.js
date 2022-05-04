//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//start进度条开始动，done进度条结束
//引入进度条样式
import 'nprogress/nprogress.css'
//引入store
import store from '@/store'


//1利用axios对象的方法create,去创建一个axios实例
//2request就是axios，只不过可以稍微配置下
const request = axios.create({
    //配置对象
    //基础路径
    baseURL:'/api',
    //请求超出的时间
    timeout:5000
})
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config)=>{
    //config:配置对象，对象里有个重要属性，headers请求头
    //进度条开始动
    if(store.state.shopCart.uuid_token){
        //请求头添加一个字段（userTempId这个参数是后端决定的）
        config.headers.userTempId = store.state.shopCart.uuid_token
    }
    //携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    //请求的进度条
    nprogress.start()
    return config
})

//响应拦截器
request.interceptors.response.use((res)=>{
    //成功的回调函数：服务器响应数据回来后。响应拦截器可以拦截到，可以做一些事情
    //进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
})

//对外暴露
export default request