// pages/child/child.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    childData:{
      student_name:'',
      sex: 1,
      date: '',
      birthday: '',
      student_id:'',
    },
    studentId:'',
    customerId:'',
    apiurl: 'https://app.hsuanhuai.com/',
  },

  sexChange(e) {
    console.log(e)
    this.setData({
      childData:{
        sex: e.currentTarget.id,
        student_name: this.data.childData.student_name,
        birthday: this.data.childData.birthday,
        student_id: this.data.childData.student_id
      }
    })
  },

  bindDateChange(e){
    console.log(e)
    this.setData({
      'childData.birthday':e.detail.value
    })
    console.log(this.data.childData)
  },

  back(){
    wx.navigateBack()
  },
  del(){
    //删除
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (sm)=> {
        if (sm.confirm) {
          wx.request({
            url: `${this.data.apiurl}api/v2/mini/student/delete`,
            method: 'DELETE',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'access-token': this.data.accessToken
            },
            data: {
              student_id: this.data.studentId,
            },
            success: (res) => {
              if (res.data.code == '0') {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 2000,
                })
                // wx.navigateTo({
                //   url: '../information/information'
                // })
                this.back()
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'fail',
                  duration: 2000
                })
              }
            },
            fail: (res) => {

            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  bindInput(e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    const childData = this.data.childData
    childData[item] = e.detail.value
    this.setData({
      childData
    })
  },

  submitData(){
    if (this.data.childData.student_name){
      if (this.data.childData.sex!=1&&this.data.childData.sex!=2){
        wx.showToast({
          title: '请选择性别',
          icon: 'none',
          duration: 2000
        })
      }else{
        console.log(this.data.childData)
        if (this.data.studentId) {
          console.log(this.data.studentId)
          wx.request({
            url: `${this.data.apiurl}api/v2/mini/student/update`,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'access-token': this.data.accessToken
            },
            data: {
              student_id: this.data.studentId,
              student_name: this.data.childData.student_name,
              sex: parseInt(this.data.childData.sex),
              birthday: this.data.childData.birthday
            },
            success: (res) => {
              if (res.data.code == '0') {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 2000,
                })
                // wx.navigateTo({
                //   url: '../information/information'
                // })
                this.back()
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'fail',
                  duration: 2000
                })
              }
            },
            fail: (res) => {

            }
          })
        } else {
          wx.request({
            url: `${this.data.apiurl}api/v2/mini/student/create`,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'access-token': this.data.accessToken
            },
            data: {
              customer_id: this.data.customerId,
              student_name: this.data.childData.student_name,
              sex: parseInt(this.data.childData.sex),
              birthday: this.data.childData.birthday
            },
            success: (res) => {
              if (res.data.code == '0') {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 2000,
                })
                // wx.navigateTo({
                //   url: '../information/information'
                // })
                this.back()
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'fail',
                  duration: 2000
                })
              }
            },
            fail: (res) => {

            }
          })
        }
      }
    }else{
      wx.showToast({
        title: '请输入孩子姓名',
        icon: 'none',
        duration: 2000
      })
    }

  },
  getChildInfo(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var day = new Date();
    day.setTime(day.getTime());
    var nowDate = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    this.setData({
      childData:{
        birthday: nowDate,
        sex:this.data.childData.sex,
        student_name:this.data.childData.student_name
      }
    })

    if(options.sid){
    
      this.setData({
        studentId: options.sid,
      })

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
                url: `${self.data.apiurl}api/v2/mini/student/info`,
                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'access-token': self.data.accessToken
                },
                data: {
                  student_id: options.sid
                },
                success: (res) => {
                  console.log(res.data)
                  self.setData({
                    childData: res.data.data
                  })
                },
                fail: (res) => {

                }
              })

            }
          })




        }
      })

    }else{
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


            }
          })




        }
      })
    }



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