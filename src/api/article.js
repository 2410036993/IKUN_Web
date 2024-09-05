import request from "@/utils/request";

const path = '/article'

// 获取文章详情
export const getArticleDetailApi = (id) => {
  return request({
    url: path + `/detail/${id}`
  })
}

// 获取该分类下所有的文章或则标签下所有的文章
export const getArticleClassify = (data) => {
  return request({
    url: path + `/entire/${data.page}/${data.limit}`,
    params: {
      type: data.type,
      name: data.name
    }
  })
}

// 获取文章所有标签和统计图
export const getLabelAndEchartsList = () => {
  return request({
    url: path + '/label'
  })
}

// 获取归档统计数据
export const getPigeonholeListApi = () => {
  return request({
    url: path + '/pigeonhole/count'
  })
}

// 分页查询归档数据
export const getPagePigeonholeListApi = (data) => {
  return request({
    url: path + `/pigeonhole/${data.page}/${data.limit}`
  })
}

