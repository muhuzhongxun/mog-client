import request from '@/utils/request'

// 默认地址前缀
const api_name = `/client/api/business`

// // 查询外发消息列表
// export async function getMogListApi(parm) {
//   return await http.get(`${api_name}/findMogList`, parm)
// }

// // 模糊查询
// export async function FlexibleQueryMogApi(parm) {
//   return await http.get(`${api_name}/FlexibleQueryMog`, parm)
// }

export default {
  getPageList(parms) {
    return request({
      url: `${api_name}/findMogList`,
      method: 'get',
      params: parms
    })
  },

  getByHosname(detail) {
    return request({
      url: `${api_name}/FlexibleQueryMog/${detail}`,
      method: 'get'
    })
  }
}
