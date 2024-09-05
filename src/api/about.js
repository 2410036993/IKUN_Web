import request from "@/utils/request";

const path = '/about'

export const getAboutApi = () =>{
  return request({
    url: path
  })
}
export const getPath = () => {
  return request({
    url: path + '/path'
  })
}