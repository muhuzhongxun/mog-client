import request from '@/utils/request'

// // 根据id对应的子数据列表
// export async function findDictListByIdApi(parm) {
//   return await http.get('/api/dict/findChildData', parm)
// }

// // 根据code对应的子数据列表
// export async function findDictListByCodeApi(parm) {
//   return await http.get('/api/dict/findByDictCode', parm)
// }

export default {
  // 根据code对应的子数据列表
  findByDictCode(dictCode) {
    return request({
      url: `/api/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },

  // 根据id对应的子数据列表
  findByParentId(parentId) {
    return request({
      url: `/api/dict/findChildData/${parentId}`,
      method: 'get'
    })
  }
}
