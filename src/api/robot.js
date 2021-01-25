import request from '@/lib/request'
import qs from 'qs'


export function searchRecommend(query) {
  return request({
    url: '/robot/searchRecommend',
    method: 'get',
    params: query,
    // baseURL:process.env.NODE_ENV=='development'?'':'http://hozonauto.ideepmind.com/'
  })
}

//获得机器人问答信息列表
export function sendMsg(params) {
  return request({
    url: '/webSmall/sendMsg',
    method: 'post',
    params: params,
    // baseURL:process.env.NODE_ENV=='development'?'':'http://hozonauto.ideepmind.com/'
  })
} 

