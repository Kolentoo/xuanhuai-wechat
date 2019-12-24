// pages/discount/discount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/disswiper1.jpg',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/disswiper2.jpg',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/disswiper3.jpg',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/disswiper4.jpg',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/disswiper5.jpg',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/disswiper6.jpg'
    ],
    indicatorDots: false,
    autoplay:true,
    interval: 4000,
    duration: 500,
    circular:true,

    apiurl: 'https://app.hsuanhuai.com/',
    phone:'',
    oauth_info: '',
    token:'',
    localInfo:'',
    sessionKey:'',
    shareid:'',
    popShow:false,
    user:{
      phone:'',
      code:'',
      age:'',
      name:''
    },
    check:false,
    sendcode:false,
    nowtime:59,
    agree:false,
    adid:'',

    infoShow:false,
    studentName:'',
    studentAge:'',
    ageGroup:[3,4,5,6,7,8],
    index1:0,
    index2:0,
    cityGroup:['上海','北京','武汉','其他'],
    on:'mail',
    fixed:false,
    childCheck:false,
    getPhone:false,
    sceneId:''

  },

  getPhoneNumber(e) {
    // console.log(e)
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData) 

    if (e.detail.errMsg == "getPhoneNumber:ok"){
      wx.request({
        url: `${this.data.apiurl}api/v1/mini/parse/mobile`,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'access-token': this.data.token
        },
        data: {
          iv: e.detail.iv,
          session_key: this.data.sessionKey,
          encrypted_data: e.detail.encryptedData
        },
        success: (res) => {
          console.log(res,'res')
          if (res.data.code === '0') {
            if (res.data.data!==null){
              this.setData({
                phone: res.data.data.phoneNumber
              })
              wx.setStorage({
                key: "phoneNum",
                data: res.data.data.phoneNumber,

              })
              console.log(res.data.data.phoneNumber)

              wx.request({
                url: `${this.data.apiurl}api/v1/mini/auth/simple_register`,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  // 'access-token': this.data.token
                },
                data: { 
                  mobile: this.data.phone,
                  oauth_id: this.data.localInfo.oauth_id,
                  activity_id: '13',
                  account_id_src: this.data.shareid?this.data.shareid:'',
                  ad_id: this.data.adid?this.data.adid:'1',
                  qr_code_id: this.data.sceneId
                },
                success: (res) => {
                  console.log(res.data)

                  if (res.data.code === '0') {
                    this.openMore()
                    // wx.redirectTo({
                    //   url: '../../pages/finish/finish'
                    // })
                  } else if (res.data.code === '1005001'){
                    this.openMore()
                  }else{
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 2000
                    })
                  }

                },
                complete(err) {
                  console.log(err, 'err')
                }
              });

            }
            
            
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }



        },
        fail:(err)=>{

        }
      });

    }else{
      this.setData({
        popShow: true
      })
    }
  },

  checkPhone(){
    if (this.data.user.phone) {
      if (this.data.user.phone.length == 11 && this.data.user.phone.charAt(0) == 1){
        this.setData({
          check: true
        })
      }else{
        this.setData({
          check: false
        })
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      this.setData({
        check: false
      })
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
    }
  },

  getcode(){
    this.checkPhone()
    if(this.data.check){
      wx.request({
        url: `${this.data.apiurl}api/v1/meta/sms`,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          mobile: this.data.user.phone,
          type:10
        },
        success: (res) => {
          if(res.data.code=='0'){
            wx.showToast({
              title: '发送成功',
              icon: 'none',
              duration: 2000
            })
            let time = parseInt(this.data.nowtime)
            this.setData({
              sendcode: true
            })
            let self = this

            var control = setInterval(() => {
              time--
              if (time > 0) {
                self.setData({
                  nowtime: time
                })
              } else {
                clearInterval(control)
                this.setData({
                  sendcode: false
                })
              }
            }, 1000)
          }else{
            wx.showToast({
              title:res.data.message,
              icon: 'none',
              duration: 2000
            })
          }


        },
        fail:(res)=>{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })






    }
  },

  close(){
    this.setData({
      popShow:false
    })
  },

  change(e){
    if(e.detail.value.length>0){
      this.setData({
        agree:true
      })
    }else{
      this.setData({
        agree: false
      })
    }
  },

  getGift(){
    this.checkPhone();
    if(this.data.check){
      if(this.data.user.code){
        if (this.data.user.code.length==4){
          if(this.data.agree){
            //提交免费领取
            this.submitData()
          }else{
            wx.showToast({
              title: '请同意使用协议',
              icon: 'none',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '验证码错误',
            icon: 'none',
            duration: 2000
          })
        }
      }else{
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  submitData(){
    wx.request({
      url: `${this.data.apiurl}api/v1/mini/auth/simple_register_sms`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': this.data.token
      },
      data: {
        mobile: this.data.user.phone,
        oauth_id: this.data.localInfo.oauth_id,
        activity_id: '13',
        account_id_src: this.data.shareid ? this.data.shareid : '',
        sms_code: this.data.user.code,
        ad_id: this.data.adid?this.data.adid:'1',
        qr_code_id: this.data.sceneId
      },
      success: (res) => {
        if (res.data.code === '0') {
          this.openMore()

        } else if (res.data.code === '1005001') {
          this.openMore()
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }



      }
    });
  },

  bindInput(e) {
    let item = e.currentTarget.dataset.item
    const user = this.data.user
    user[item] = e.detail.value
    this.setData({
      user
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  checkInfo(){
    console.log(this.data.user.name)
    if (this.data.user.name){
      if(this.data.user.age){
        this.setData({
          childCheck:true
        })
        this.submitInfo()
      }else{

        this.setData({
          childCheck: false
        })
        wx.showToast({
          title: '请输入孩子年龄',
          icon: 'none',
          duration: 2000
        })
      }
    }else{

      this.setData({
        childCheck: false
      })
      wx.showToast({
        title: '请输入孩子姓名',
        icon: 'none',
        duration: 2000
      })
    }
  },

  submitInfo(){
    console.log(this.data.token)
    if(this.data.childCheck){
      wx.request({
        url: `${this.data.apiurl}api/v1/student/completeInformation`,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'access-token': this.data.token
        },
        data: {
          student_name: this.data.user.name,
          mobile: this.data.phone,
          age: this.data.user.age,
          sex:this.data.on==='mail'?'1':'2',
        },
        success: (res) => {
          console.log(res.data)
          if (res.data.code == '0') {
            wx.redirectTo({
              url: '../../pages/finish/finish'
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }


        },
        fail: (res) => {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  choosemail(){
    this.setData({
      on:'mail'
    })
  },

  choosefemail(){
    this.setData({
      on: 'femail'
    })
  },

  closeMore(){
    this.setData({
      infoShow:false
    })
    this.setData({
      popShow: false
    })
  },

  openMore(){
    this.setData({
      infoShow: true
    })
    this.setData({
      popShow: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scene){
      console.log(options.scene)
      this.setData({
        sceneId: options.scene
      })
    }


    let self = this
    wx.getStorage({
      key: 'phoneNum',
      success(res) {
        console.log(res.data)
        self.setData({
          phone: res.data,
          getPhone: true
        })


      }
    })

    
    wx.login({
      success(res) {
        console.log(res, 'res')
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
                wx.setStorage({
                  key: "accessToken",
                  data: res.data.data.account_info.access_token
                })
                wx.setStorage({
                  key: "customerId",
                  data: res.data.data.account_info.customerInfo.customer_id
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
            complete() {
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

          // wx.getLocation({
          //   type: 'wgs84',
          //   success(res) {
          //     console.log(res)
          //     const latitude = res.latitude
          //     const longitude = res.longitude
          //     const speed = res.speed
          //     const accuracy = res.accuracy
          //   }
          // })

        } else {
          // console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // if (options.account_id){
    //   self.setData({
    //     shareid: options.account_id
    //   })
    // }

    // if (options.ad_id) {
    //   self.setData({
    //     adid: options.ad_id
    //   })
    // }

    // console.log('shareid:'+this.data.shareid)
    // console.log('adid:' + this.data.adid)

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
      key: 'phoneNum',
      success(res) {
        console.log(res.data)
        self.setData({
          phone: res.data,
          getPhone: true
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

  },

  onPageScroll: function (scrollTop){
    if (scrollTop.scrollTop>650){
      this.setData({
        fixed:true
      })
    }else{
      this.setData({
        fixed: false
      })
    }
  }
})