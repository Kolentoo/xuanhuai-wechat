// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiurl: 'https://app.hsuanhuai.com/',
    userInfo:'', 
    oauth_info:'',
    optionGroup:''
  },
  
  getInfo(e){
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    wx.getUserInfo({
      success: (res) => {
        // console.log(res)
        this.setData({
          userInfo: res.userInfo
        })

        wx.request({
          url: `${this.data.apiurl}api/v1/mini/auth/set_info`,
          method:'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            iv:res.iv,
            session_key:this.data.oauth_info.session_key,
            encrypted_data: res.encryptedData,
            nick_name:res.userInfo.nickName,
            avatar:res.userInfo.avatarUrl,
            gender:res.userInfo.gender,
            channel:'',
            oauth_id: this.data.oauth_info.oauth_id
          },
          
          success: (res) => {
            wx.request({
              url: `${this.data.apiurl}api/v1/mini/qr/scan`,
              method:'GET',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                qr_id:this.data.optionGroup.id,
                oauth_id: this.data.oauth_info.oauth_id
              },
              
              success: (res) => {

                wx.redirectTo({
                  url: '../../pages/home/home'
                })
              } 
            });


          },
          complete: (res) => {
            wx.hideToast()
          }
        });


      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(options,'options')
    this.setData({
      optionGroup:options
    })

    let self = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `${self.data.apiurl}api/v1/mini/auth/authenticate`,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              auth_code: res.code
            },
            success: (res) => {
              // console.log(res.data.data)
              if(res.data.code==='0'){
                self.setData({ 
                  oauth_info: res.data.data.oauth_info
                })
                wx.setStorage({
                  key: "me",
                  data: JSON.stringify(res.data.data.oauth_info)
                })
                wx.setStorage({
                  key: "sessionKey",
                  data: res.data.data.session_key
                })
              }else{

              }

            },
            fail(err){
              wx.showToast({
                title: err.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else {
          // console.log('登录失败！' + res.errMsg)
        }
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

  }
})