//储存
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}
//获取
export const getToken = ()=>{
    //为啥这里需要return一下
    return localStorage.getItem('TOKEN')
}
//清除
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN')
}
