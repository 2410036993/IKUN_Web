import request from "@/utils/request";


// 查询所有的留言
export const getMessageList = () => {
  return request({
    url: '/message/message'
  })
}

// 添加留言用户
export const addMessageUser = (data) =>{
  return request({
    url: '/message/save',
    method: 'post',
    data
  })
}

// 发送留言
export const sendMessage = (data) =>{
  return request({
    url: '/message/send',
    method: 'post',
    data
  })
}