import request from "@/utils/request";

const path = '/article'

// 获取文章分类和分类下的排序数据
export const getClassifyList = () =>{
  return request({
    url: path + '/classify'
  })
}


