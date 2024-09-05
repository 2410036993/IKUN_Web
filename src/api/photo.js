import request from "@/utils/request";

// 获取所有的分类
export const getCategory = () => {
  return request({
    url: '/photo/category'
  })
}

// 获取分类下的图片
export const getPhoto = (id) => {
  return request({
    url: `/photo/photo/${id}`
  })
}