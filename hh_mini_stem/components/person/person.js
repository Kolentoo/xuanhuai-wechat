// components/person/person.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasPhone: {
      type: String,//类型
      value:''
    }
  },
  lifetimes: {
    // attached() {
    //   // 在组件实例进入页面节点树时执行
    //   console.log(this.properties.phone)
    //   this.setData({
    //     phone: this.properties.phone.value
    //   })
    // },
    // ready() {
    //   // 在组件在视图层布局完成后执行
    //   this.setData({
    //     phone:this.properties.phone.value
    //   })
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    phone:'',
    phoneNumber:'',
    apiurl: 'https://app.hsuanhuai.com/',
  },


  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber(e) {

      let self = this
      wx.getStorage({
        key: 'phoneNum',
        success(res) {
          self.setData({
            phone: res.data
          })
        }
      })

      if (this.data.phone){
        console.log(1)
      }else{
        console.log(e)
        // console.log(e.detail.errMsg)
        // console.log(e.detail.iv)
        // console.log(e.detail.encryptedData) 
        
        wx.getStorage({
          key: 'sessionKey',
          success(res) {
            // console.log(res)
            self.setData({
              sessionKey: res.data
            })

            if (e.detail.errMsg == "getPhoneNumber:ok") {
              wx.request({
                url: `${self.data.apiurl}api/v1/mini/parse/mobile`,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'access-token': self.data.token
                },
                data: {
                  iv: e.detail.iv,
                  session_key: self.data.sessionKey,
                  encrypted_data: e.detail.encryptedData
                },
                success: (res) => {
                  console.log(res, 'res')
                  if (res.data.code === '0') {

                    if (res.data.data !== null) {
                      self.setData({
                        phone: res.data.data.phoneNumber
                      })
                    }
                    wx.setStorage({
                      key: "phoneNum",
                      data: res.data.data.phoneNumber,
                      success:function(){
                        wx.navigateTo({
                          url: '../my/my',
                        })
                      }
                    })
 


                  } else {
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 2000
                    })
                  }



                },
                fail: (err) => {

                }
              });

            } else {
              self.setData({
                popShow: true
              })
            }
          }
        })
      }


    },
  }
})
