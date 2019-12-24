// pages/demo/demo.js
// let City = require('../../utils/allcity.js');

Page({

  data: {
    city: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true // 是否开启标题吸顶
    },
    apiurl: 'https://app.hsuanhuai.com/',
  },
  getCityList() {
    wx.request({
      url: `${this.data.apiurl}api/v2/mini/cityList`,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': this.data.accessToken
      },
      data: {},
      success: (res) => {
        console.log(res.data)
        if (res.data.code === '0') {
          this.setData({
            city:res.data.data
          })
        }
      },
      fail: (res) => {

      }
    })
  },
  onLoad() {
    wx.showLoading({
      title: '加载数据中...',
    })
    // 模拟服务器请求异步加载数据
    let self = this
    setTimeout(()=>{
    self.getCityList()
    // this.setData({
    //   city: City
    // })
      wx.hideLoading()
    },2000)

  },
  bindtap(e) {
    console.log(e.detail)
    wx.setStorage({
      key: "name",
      data: e.detail.name,
      success:()=>{
        wx.setStorage({
          key: "value",
          data: e.detail.value,
          success: () => {
            wx.navigateBack()
          }

        })
      }

    })
    
    // wx.navigateTo({
    //   url: `../information/information?name=${e.detail.name}&value=${e.detail.value}`,
    // })
  },

})