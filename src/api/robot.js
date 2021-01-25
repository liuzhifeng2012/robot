import request from '@/lib/request'
import qs from 'qs'

// export function fetchList(query) {
//   return request({
//     url: '/vfang/ad/list',
//     method: 'get',
//     params: query
//   })
// }

//获得机器人问答信息列表
export function sendMsg(params) {
  return request({
    url: '/webSmall/sendMsg',
    method: 'post',
    params: params
  })
} 

