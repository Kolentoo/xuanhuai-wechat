// pages/items/items.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiurl:'',
    allData:[
      {
        name:'低消产品1',
        team:[
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
        ]
      },
      {
        name:'低消产品2',
        team:[
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
        ]
      },
      {
        name:'低消产品3',
        team:[
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
          {groupName:'航动外呼团队',member:'63',totalSuccessPrecent:'25.1%',Outbound:11111,connect:345,connectPrecent:'30%',success:12000,successPrecent:'30%'},
        ]
      }


  ]
  },

  getData(){
    // 拉取数据
    // wx.showLoading({
    //   title: '加载中',
    // })
    // let self = this
    // wx.request({
    //   url: self.data.apiurl + '',
    //   data: {

    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success(res) {
    //     console.log(res.data)


    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    //下拉刷新加载更多数据  备用
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})