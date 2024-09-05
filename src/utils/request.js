import axios from 'axios'
import {
  ElMessage
} from 'element-plus'
// 创建axios实例
const request = axios.create({
  // 配置请求的基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API + '/web',
  timeout: 10000
})

// axios请求拦截器 每次请求携带token
request.interceptors.request.use(config => {
  // 返回配置信息
  return config
}, e => Promise.reject(e))


request.interceptors.response.use(res => {
  // 响应成功将数据解刨一层
  if (res.data.code === 200) {
    // 解刨一层
    return res.data
  } else {
    ElMessage.error(res.data.msg)
    return Promise.reject(res.data.msg)
  }
}, e => {
  // 提示错误信息
  ElMessage.warning(e.message)
  // 抛出错误结果
  return Promise.reject(e)
})
// axios响应拦截器
export default request;