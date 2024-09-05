import request from "@/utils/request";

const path = '/talk'
// 获取说说
export const getTalk = () => {
  return request({
    url: path + '/list'
  })
}

// 保存说说用户
export const saveTalkUser = (data) => {
  return request({
    url: path + '/user',
    method: 'post',
    data
  })
}

// 用户点赞
export const updateLike = (id, status, talkId) => {
  return request({
    url: path + `/liked/${id}/${status}/${talkId}`,
    method: 'put'
  })
}

// 查询用户是否已经点赞过了
export const getIsLike = (id,talkId) =>{
  return request({
    url: path + `/islike/${id}/${talkId}`
  })
}

// 发送评论
export const comment = (id,talkId,remork) =>{
  return request({
    url: path + `/comment/${id}/${talkId}`,
    method: 'post',
    params:{
      remork
    }
  })
}