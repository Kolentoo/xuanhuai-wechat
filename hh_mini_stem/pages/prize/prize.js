// pages/prize/prize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    apiurl: 'https://app.hsuanhuai.com/',
    prize:1000,
    prizeGroup:[],
    currentPage:1,
    customerId:'',
    finish:false,
  },

  getPrizeList(page){
    let self = this
    wx.request({
      url: self.data.apiurl + 'api/v2/mini/scholarship/list',
      data: {
        customer_id: self.data.customerId,
        page: page,
        limit: 15
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == '0') {
          if (res.data.data.list.length<15){
            self.setData({
              prizeGroup: self.data.prizeGroup.concat(res.data.data.list),
              finish:true
            })
          }else{
            self.setData({
              prizeGroup: self.data.prizeGroup.concat(res.data.data.list),
              currentPage: self.data.currentPage + 1,
              finish: false
            })
          }

        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this

    wx.getStorage({
      key: 'accessToken',
      success(res) {
        self.setData({
          accessToken: res.data
        })

        wx.getStorage({
          key: 'customerId',
          success(res) {
            self.setData({
              customerId: res.data
            })

            self.getPrizeList(self.data.currentPage)

            wx.request({
              url: `${self.data.apiurl}api/v2/mini/customer/info`,
              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'access-token': self.data.accessToken
              },
              data: {
                customer_id: self.data.customerId
              },
              success: (res) => {
                console.log(res)
                self.setData({
                  user: res.data.data
                })

              },
              fail: (res) => {

              }
            })

          }
        })


      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onReachBottom: function () { //触底开始下一页
    if(!this.data.finish){
      this.getPrizeList(this.data.currentPage)
    }
    
  },
})