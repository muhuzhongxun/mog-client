import request from '@/utils/request'

// 默认地址前缀
// 此处复用后端接口
const api_name = `/api/panel`

export default {
  // 根据id对应的子数据列表
  findByPosition(parm) {
    return request({
      url: `${api_name}/listByPosition/${parm}`,
      method: 'get'
    })
  }
}
