import { v4 as uuidv4 } from 'uuid';
export const getUUID = ()=>{
    //从本地数据获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')  
    if(!uuid_token){
        //如果没有则生成临时游客身份
        uuid_token = uuidv4()
        //本地储存一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    //封装函数必须有返回值
    return uuid_token
}