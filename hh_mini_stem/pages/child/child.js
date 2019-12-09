// pages/child/child.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:'boy',
    date: '',
    today:''
  },

  sexChange(e) {
    console.log(e)
    this.setData({
      sex: e.currentTarget.id
    })
  },

  bindDateChange(e){
    console.log(e)
  },

  back(){
    wx.navigateBack()
  },
  del(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var day = new Date();
    day.setTime(day.getTime());
    var nowDate = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    this.setData({
      today: nowDate
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

  }
})