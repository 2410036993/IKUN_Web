import request from "@/utils/request";

const path = '/article'

// 文章分页查询 
export const articlePageList = (data) => {
  return request({
    url: path + `/${data.page}/${data.limit}`
  })
}

// 获取文章分类
export const getCategoryListApi = () => {
  return request({
    url: path + '/group'
  })
}

// 获取最火的文章
export const getHotArticle = () => {
  return request({
    url: path + '/hot'
  })
}

// 获取推荐文章
export const getRecommend = () => {
  return request({
    url: path + '/recommend'
  })
}

// 获取个人信息
export const getWebsite = () => {
  return request({
    url: path + '/website'
  })
}

// 统计数据
export const getCountApi = () => {
  return request({
    url: path + '/count'
  })
}

export const searchData = (name) => {
  return request({
    url: path + '/search',
    params: {
      value: name
    }
  })
}