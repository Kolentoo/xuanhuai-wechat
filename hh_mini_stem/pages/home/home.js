// pages/home/home.js
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    oauth_info:'',
    imgUrls: [
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/swiper1.png',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/swiper2.png',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/swiper4.png',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/swiper5.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    coopGroup:[
      { url:'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/ad1.png'},
      { url: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/ad2.png' },
      { url: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/ad3.png' },
      { url: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/ad4.png' },
      { url: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/ad5.png' }
    ],
    lessonGroup:[
      {
        url:'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/lesson1.png',
        title:'科学思维课程',
        txt1:'“手脑并用 ” 升级思维，激发孩子创造力',  
        txt2:'全面对接青少儿国内国际科学竞赛',    
        txt3:'• 数学思维 • 编程思维 • 科学工程'    
      }, 
      {
        url: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/lesson2.png',
        title: '英文思维课程',
        txt1: '课程个性化定制，同步美国青少儿英文学习',
        txt2:'• 表达英文 • 科学英文 • 思辨英文'
      },   
      {
        url: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/lesson3.png', 
        title: '学习规划课程',
        txt1: '全程“1对1”服务，送孩子去英美读中学',
        txt2:'•申请海外名校 •双师课堂学习'  
      }
      
    ],
    token:'',
    localInfo:'',
    userInfo:'',
    user:{
      name: '',
      birthday: '',
      age: '',
      learning: '',
    },
    phone: '',
    index: 0,
    array: [],
    apiurl: 'https://app.hsuanhuai.com/',
    sessionKey:''
  },
  getGift(){
    // const height = this.data.projectNum * 90 + 92    // 计算出页面高度
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })

  },
  dateChange(e){
    this.setData({
      birthday:e.detail.value
    })
  },
  sectionChange(e){
    this.setData({
      index: e.detail.value
    })
  },
  bindInput(e){
    let item = e.currentTarget.dataset.item
    const user = this.data.user
    user[item] = e.detail.value
    this.setData({
      user
    })
  },
  getPhoneNumber(e) {
    // console.log(e)
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData) 

    wx.request({ 
      url: `${this.data.apiurl}api/v1/mini/parse/mobile`,
      method: 'POST',
      header: { 
        'content-type': 'application/x-www-form-urlencoded' ,
        'access-token': this.data.token
      },
      data: {
        iv: e.detail.iv,
        session_key: this.data.sessionKey,
        encrypted_data: e.detail.encryptedData 
      },
      success: (res) => {
        if (res.data.code === '0') {
          this.setData({
            phone: res.data.data.phoneNumber
          })
          console.log(res.data.data.phoneNumber)
        } else {
          wx.showToast({ 
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      complete(){

      }
    });
  },

  submitData(){
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    wx.request({
      url: `${this.data.apiurl}api/v1/mini/auth/register_mobile`,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        mobile:this.data.phone,
        oauth_id:this.data.localInfo.oauth_id,
        customer_name:this.data.user.name,
        age:this.data.user.age,
        activity_id:'13',
        school_id: this.data.array[this.data.index].organization_id
      },

      success: (res) => {
        console.log(res.data.data)
        if(res.data.code==='0'){
          wx.setStorage({
            key: "accountid",
            data: res.data.data.account_id
          })
          wx.setStorage({
            key: "token",
            data: res.data.data.access_token,
            success:()=>{
              wx.redirectTo({
                url: '../../pages/success/success'
              }) 
            }
          })

        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      complete:(res)=>{
        wx.hideToast()
      }
    }); 
  }, 
 
  submitInfo(){
    
    if (this.data.user.name){
      if(this.data.user.age){
        if (this.data.phone){
          if (this.data.phone.length == 11 && this.data.phone.charAt(0)==1){
            this.submitData()
          }else{
            wx.showToast({
              title: '手机号错误',
              icon: 'none',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '请输入手机号',
            icon: 'none',
            duration: 2000
          })
        }
      }else{
        wx.showToast({
          title: '请输入年龄',
          icon: 'none',
          duration: 2000
        })
      }
    }else{ 
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: `${this.data.apiurl}api/v1/meta/center_schools`,
      methods:'POST',
      data: {"simple":1},
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        console.log(res)
        if(res.data.code==='0'){
          this.setData({
            array:res.data.data
          })
        }
      }
    });

    let self = this

    //auth
    wx.login({
      success(res) {
        console.log(res,'res')
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
              console.log(res.data.data)
              if (res.data.code === '0') { 
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
              } else {

              }

            },
            fail(err) {
              wx.showToast({
                title: err.data.message,
                icon: 'none',
                duration: 2000
              })
            },
            complete(){
              wx.getStorage({
                key: 'token',
                success(res) {
                  self.setData({
                    token: res.data
                  })
                }
              })

              wx.getStorage({
                key: 'me',
                success(res) {
                  // console.log(res,'res')
                  var info = JSON.parse(res.data)
                  // console.log(info,'info')
                  self.setData({
                    localInfo: info
                  })
                }
              })

              wx.getStorage({
                key: 'sessionKey',
                success(res) {
                  // console.log(res)
                  self.setData({
                    sessionKey: res.data
                  })
                }
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