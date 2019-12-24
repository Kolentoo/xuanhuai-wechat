// pages/information/information.js

import WeCropper from '../../utils/we-cropper.js'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = width

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cropperOpt: {
      id: 'cropper', // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 300) / 2, // 裁剪框x轴起点
        y: (width - 300) / 2, // 裁剪框y轴期起点
        width: 300, // 裁剪框宽度
        height: 300 // 裁剪框高度
      },

      
    },
    user:{
      sex: 1,
      region_name:'',
      customer_name: '',
      customer_avatar:'',
      region_code:''
    },
    upload: false,
    defaultAvatar:'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/default.png',

    childGroup:[
      // {
      //   student_name:'Kol',
      //   'sex':1,
      //   birthday:'2010-10-10'
      // },
      // {
      //   student_name: '前端测试KOLOLOLOL',
      //   'sex': 0,
      //   birthday: '2010-10-10'
      // }
    ],
    apiurl: 'https://app.hsuanhuai.com/',
    
    accessToken:'',
    customerId:'',
    policy:'',
    signature:'',
    finalName:''

  },

  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  uploadTap() {
    // this.setData({
    //   upload:true
    // })
    
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res)
        const src = res.tempFilePaths[0]
        // self.cropper.pushOrign(src)


        let picName = Date.parse(new Date())
        console.log(picName)

        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })

        wx.uploadFile({
          url: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/',
          filePath: src,
          name: 'file',
          dir:'avatar',
          formData: {
            name: src,
            key: `avatar/${picName}`,
            policy:self.data.policy,
            OSSAccessKeyId: 'LTAIWsxBCiKwJdA5',
            success_action_status: '200',
            signature: self.data.signature,

          },
          success(res) {
            console.log(res)
            console.log(picName)
            var finalPicName = 'https://elite-league.oss-cn-shanghai.aliyuncs.com/avatar/' + picName
            self.setData({
              finalName: finalPicName,
              user: {
                sex: self.data.user.sex,
                region_name: self.data.user.region_name,
                customer_name: self.data.user.customer_name,
                customer_avatar: finalPicName,
              }
            })

            wx.hideToast()
          },
          fail(err) {
            console.log(err)
          }
        })
      }
    })
  },
  // getCropperImage() {
  //   this.wecropper.getCropperImage((tempFilePath) => {
  //     // tempFilePath 为裁剪后的图片临时路径
  //     console.log('url', tempFilePath)
  //     if (tempFilePath) {
  //       this.getCropperBase64(tempFilePath)
  //       this.setData({
  //         user: {
  //           customer_avatar: tempFilePath
  //         },
  //         upload: false
  //       })
  //     } else {
  //       console.log('获取图片地址失败，请稍后重试')
  //     }
  //   })
    
  // },
  // getCropperBase64(base64){
  //   this.wecropper.getCropperBase64((base64) => {
  //     console.log(base64)
  //   })
  // },
  changeSex(e){
    if (e.currentTarget.id==='mail'){
      this.setData({
        'user.sex':1
      })
    }else{
      this.setData({
        'user.sex': 2
      })
    }
  },
  cancel(){
    this.setData({
      upload:false
    })
  },
  clear(){
    let userName = this.data.user.customer_name
    this.setData({
      'user.customer_name':''
    })
  },
  chooseCity(){
    wx.navigateTo({
      url: '../demo/demo',
    })
  },
  addChild(){
    wx.navigateTo({
      url: '../child/child',
    })
  },
  getInfo(){
    // wx.request({
    //   url: `${this.data.apiurl}api/v2/mini/customer/info`,
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'access-token': this.data.accessToken
    //   },
    //   data: {
    //     // customer_id: 1212
    //     customer_id: this.data.customerId
    //   },
    //   success: (res) => {
    //     console.log(res.data)
    //     if(res.data.code==='0'){
    //       this.setData({
    //         user: res.data.data,
    //         childGroup:res.data.data.student_list,
    //       })
    //     }


    //   },
    //   fail: (res) => {

    //   }
    // })
  },
  editStudent(e){
    console.log(e.target.dataset)
    wx.navigateTo({
      url: '../child/child?sid=' + e.target.dataset.sid,
    })
  },
  getUploadInfo(){
    wx.request({
      url: `${this.data.apiurl}api/v2/mini/createUploadParams`,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': this.data.accessToken
      },
      data: {},
      success: (res) => {
        console.log(res.data)
        if (res.data.code === '0') {
          this.setData({
            policy: res.data.data.policy,
            signature: res.data.data.signature,
          })
        }
      },
      fail: (res) => {

      }
    })
  },
  checkData(){
    if (!this.data.user.customer_name){
      wx.showToast({
        title: '请输入家长姓名',
        icon: 'none',
        duration: 2000
      })
    }else{
      if (this.data.user.sex != 1 && this.data.user.sex != 2){
        wx.showToast({
          title: '请选择性别',
          icon: 'none',
          duration: 2000
        })
      }else{
        this.save()
      }
      
    }
  },
  save(){
    wx.request({
      url: `${this.data.apiurl}api/v2/mini/customer/update`,
      method: 'Post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': this.data.accessToken
      },
      data: {
        customer_id:this.data.customerId,
        customer_name: this.data.user.customer_name,
        sex: this.data.user.sex,
        region_code: this.data.user.region_code,
        customer_avatar: this.data.user.customer_avatar
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.code === '0') {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          // wx.navigateTo({
          //   url: '../my/my',
          // })
          wx.navigateBack()
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (res) => {

      }
    })
  },
  bindInput(e) {
    let item = e.currentTarget.dataset.item
    const user = this.data.user
    user[item] = e.detail.value
    this.setData({
      user
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.value) {
      self.setData({
        'user.region_name': options.name,
        'user.region_code': options.value
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
            // self.getInfo()
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
                console.log(res.data)
                if (res.data.code === '0') {
                  self.setData({
                    user: res.data.data,
                    childGroup: res.data.data.student_list,
                  })
                  wx.getStorage({
                    key: 'name',
                    success(res) {
                      self.setData({
                        'user.region_name': res.data
                      })

                      wx.getStorage({
                        key: 'value',
                        success(res) {
                          self.setData({
                            'user.region_code': res.data
                          })
                        }
                      })
                    }
                  })


                }


              },
              fail: (res) => {

              }
            })
            self.getUploadInfo()

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