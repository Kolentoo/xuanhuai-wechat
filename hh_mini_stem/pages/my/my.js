// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatar:'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/default.png',
    user:{
      customer_avatar:'',
      customer_name:'Kol',
      scholarship:''
    },
    apiurl: 'https://app.hsuanhuai.com/',
    accessToken:'',
    customerId:''
  },

  goInvitate(){
    wx.navigateTo({
      url: "../Invitate/Invitate",
    })
  },
  goAct(){
    wx.navigateTo({
      url: "../act/act",
    })
  },
  goPrize(){
    wx.navigateTo({
      url: "../prize/prize",
    })
  },
  editInfo(){
    wx.navigateTo({
      url: "../information/information",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



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

  }
})