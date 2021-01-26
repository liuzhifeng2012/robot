import request from '@/lib/request'
import qs from 'qs'


export function searchRecommend(query) {
  return request({
    url: '/api/robot-process-semantic-service-dms/robot/searchRecommend',
    method: 'get',
    params: query,
  })
}

//获得机器人问答信息列表
export function sendMsg(params) {
  return request({
    url: '/api/dms/webSmall/sendMsg',
    method: 'post',
    params: params,
  })
}

