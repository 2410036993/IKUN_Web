import request from "@/utils/request";

const path = "/link"
// 友链申请
export const applyForLink = (data) => {
  return request({
    url: path + "/applylink",
    method: 'post',
    data
  })
}

// 查询申请友链反馈信息
export const queryApply = (linkAddress) => {
  return request({
    url: path + "/queryapply",
    params: {
      linkAddress
    }
  })
}

// 查询所有的友链
export const getLinklist = () => {
  return request({
    url: path + "/linklist"
  })
}

// 修改友链
export const updateLink = (data) => {
  return request({
    url: path + '/updateLink',
    method: 'put',
    data
  })
}