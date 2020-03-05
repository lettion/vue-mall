import axios from 'axios'
const CancelToken = axios.CancelToken
let cancel

export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次请求')
  cancel = null
  return axios.get(`https://www.imooc.com/api/category/content/${id}`, {
    timeout: 10000,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
    .then(res => {
      if (res.data.code === 0) {
        return res.data.content
      }
      throw new Error('没有获取到数据')
    }).catch(err => {
      if (axios.isCancel(err)) {
        console.log(err)
      } else {
        console.log(err)
      }
    })
}
