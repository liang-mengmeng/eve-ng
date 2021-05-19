import Mock from 'mockjs'
import experimentData from './experimentList.js'

Mock.mock('/mock/experimentData', 'get', () => {
  return experimentData
})