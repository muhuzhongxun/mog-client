import request from '@/utils/request'

// 默认地址前缀
const api_name = `/client/api/business`

export default {
  // 分页查询+条件查询+联表查询出外发信息列表 parms -> queryObject
  getPageList(parms) {
    return request({
      url: `${api_name}/findMogList`,
      method: 'get',
      params: parms
    })
  },

  // 根据名称查询信息，用于搜索框提示栏展示 parms-> detail
  getAllMOG() {
    return request({
      url: `${api_name}/findAllMogList`,
      method: 'get'
    })
  },

  // 根据id查询mog详细信息
  show(ogId) {
    return request({
      url: `${api_name}/findMogDetail/${ogId}`,
      method: 'get'
    })
  },

  // 根据发布者id查询其相关发布信息种类以及详情
  findAllPublishMog(userId) {
    return request({
      url: `${api_name}/findAllPublishMog/${userId}`,
      method: 'get'
    })
  }
}
