// pages/finish/finish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    wx.getStorage({
      key: 'me',
      success(res) {
        var info = JSON.parse(res.data)
        self.setData({
          localInfo: info
        })
        console.log(info)
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
    return {
      title: '0元领取你的专属科学大礼包！',
      // desc: '0元领取科学大礼包，体验课、权威测评、科学读本等你来拿！',
      imageUrl:'http://elite-league.oss-cn-shanghai.aliyuncs.com/mini/school.jpg',
      path: `/pages/discount/discount?account_id=${this.data.localInfo.account_id}` // 路径，传递参数到指定页面。
    }
  }
})