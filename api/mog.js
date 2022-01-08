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
  getByDetail(parms) {
    return request({
      url: `${api_name}/FlexibleQueryMog/${parms}`,
      method: 'get'
    })
  },

  // 根据id查询mog详细信息
  show(hoscode) {
    return request({
      url: `${api_name}/${hoscode}`,
      method: 'get'
    })
  },

  // 根据医院编号查询科室
  findDepartment(hoscode) {
    return request({
      url: `${api_name}/department/${hoscode}`,
      method: 'get'
    })
  }
}
