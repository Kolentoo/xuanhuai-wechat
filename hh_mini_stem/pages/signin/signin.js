// pages/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    send:false,
    time:59,
    apiurl:'',
  },
  phoneValue(e){
    this.setData({
      phone:e.detail.value
    })
  },
  codeValue(e){
    this.setData({
      code:e.detail.value
    })
  },
  phoneCheck(){
    console.log(this)
    if(!this.data.phone){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }else{
      if(this.data.phone.length==11&&this.data.phone.charAt(0)==1){
        return true
      }else{
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none',
          duration: 2000
        })
        return false
      }
    }

  },
  sendCode(){
    if(this.phoneCheck()){
      wx.showToast({
        title: '发送成功',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        send:true
      })
      let self = this
      setInterval(()=>{
        if(self.data.time>1){
          let second = self.data.time
          second--;
          self.setData({
            time:second
          })
        }else{
          self.setData({
            send:false
          })
        }
      },1000)
      
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
    }
  },
  signin(){
    if(this.data.phone.length==11&&this.data.code.length==6){
      console.log('登录')
      wx.navigateTo({ url:'../../pages/items/items'})
    }

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