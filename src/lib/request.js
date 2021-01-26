import axios from 'axios'
import { Toast } from 'vant';
// import store from '@/store'
import { getToken } from '@/lib/auth'

// create an axios instance
const service = axios.create({
  timeout: 50000 // request timeout
})



// request interceptor
service.interceptors.request.use(
  config => {
    // // Do something before request is sent
    // if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['vfang-token'] = getToken()
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // }   
    config.baseURL=process.env.NODE_ENV=='development'?'':'http://hozonauto.ideepmind.com/'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code === 1000) {
      return Promise.reject('error')
    }
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    else if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      Toast('你已被登出，可以取消继续留在该页面，或者重新登录')
      return Promise.reject(error)
    }
    else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    let message = "";
    if (error.message.indexOf("timeout") == -1) {
      message = error.message;
    } else {
      message = "网络异常，请稍后再试！"
    }

    Toast(message)
    return Promise.reject(error)
  }
)

export default service
