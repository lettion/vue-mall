import jsonp from 'assets/js/jsonp'
import axios from 'axios'
// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length
  let i = arrLength
  let rndNum

  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]]
    }
  }

  return arr
}

// 获取轮播图数据
export const getHomeSlider = () => {
  return axios.get('/api/slider.json', {timeout: 10000}).then(res => {
    if (res.data.code === 0) {
      let sliders = res.data.slider
      const slider = [sliders[Math.floor(Math.random() * sliders.length)]]
      // filter()方法会遍历数组，这里是用50%的概率去判断数组里的每一项为true或者false，true则保留，false则删除
      sliders = shuffle(sliders.filter(() => Math.random() > 0.5))
      if (sliders.length === 0) {
        sliders = slider
      }
      return sliders
    }
    throw new Error('没有获取到数据')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
    return [{
      'linkUrl': 'https://www.baidu.com',
      'picUrl': require('assets/img/404.png')
    }]
  })
}
// 获取热门推荐数据
export const getHomeRecommend = (page = 1, psize = 20) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json'
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  }

  return jsonp(url, params, {
    param: 'callback',
    timeout: 10000
  }).then(res => {
    if (res.code === '200') {
      return res
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
}
