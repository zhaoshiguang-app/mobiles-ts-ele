import axios from 'axios'
const ip = 'http://elm.cangdu.org';
/**
 * @method cityGuess
 * @param {string} type 当前定位城市
 * @return {promise}
 */
export const cityGuess = (type) => {
  return axios.request({
    url: `${ip}/v1/cities`,
    method: 'get',
    params: {
      type,
    },
  })
}
/**
 * @method hotCity
 * @param {string} type 热门城市
 * @return {promise}
 */
export const hotCity = (type) => {
  return axios.request({
    url: `${ip}/v1/cities`,
    method: 'get',
    params: {
      type,
    },
  })
}
/**
 * @method groupCity
 * @param {string} type 所有城市
 * @return {promise}
 */
export const groupCity = (type) => {
  return axios.request({
    url: `${ip}/v1/cities`,
    method: 'get',
    params: {
      type,
    },
  })
}
/**
 * @method currentcity 获取当前所在城市
 * @param {string}  id 城市id
 * @return {promise}
 */
export const currentCity = (id) => {
  return axios.request({
    url: `${ip}/v1/cities/${id}`,
    method: 'get',
  })
}
/**
 * @method searchPlace 获取搜索地址
 * @param {string}  cityId 城市id
 * @param {string}  value 用户输入的信息
 * @return {promise}
 */
export const searchPlace = (cityId, value) => {
  const params = {
    type: 'search',
    city_id: cityId,
    keyword: value,
  }
  return axios.request({
    url: `${ip}/v1/pois`,
    method: 'get',
    params,
  })
}
/**
 * @method msiteAddress 获取msite页面地址信息
 * @param {string}  geohash 地理位置
 * @return {promise}
 */
export const msiteAddress = (geohash) => {
  return axios.request({
    url: `${ip}/v2/pois/${geohash}`,
    method: 'get',
  })
}
