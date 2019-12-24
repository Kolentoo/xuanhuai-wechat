// pages/Invitate/Invitate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:10,
    mailavatar: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/boy.png',
    femailavatar: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/girl.png',
    friendGroup:[],

    draw: false,
    token: '',
    localInfo: '',
    share: false,

    accountid: '',
    userInfo: {
      avatarUrl: "",
      nickName: "",
    },
    headPath: '',
    sendName: '',
    cardPath:'',
    cardPath1: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/wechatpic1.jpg',
    cardPath2: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/wechatpic2.jpg',
    codeUrl: '',
    apiurl: 'https://app.hsuanhuai.com/',

    // 海报
    indicatorDots: false,
    autoplay: false,
    interval: 4000,
    duration: 500,
    circular: true,
    current:0,
    imgUrls: [
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/wechatpic1.jpg',
      'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/wechatpic2.jpg',
    ],
    index:0,
    choose:false,

    currentPage: 1,
    customerId: '',
    finish: false,
    draw:false,
    oauth_info:'',
    accountId:''
  },

  getFriendList(page){
    let self = this
    wx.request({
      url: self.data.apiurl + 'api/v2/mini/invitation',
      data: {
        customer_id: self.data.customerId,
        page: page,
        limit: 15
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': self.data.accessToken
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == '0') {
          self.setData({
            total: res.data.data.total
          })
          if (res.data.data.list.length < 15) {
            self.setData({
              friendGroup: self.data.friendGroup.concat(res.data.data.list),
              finish: true
            })
          } else {
            self.setData({
              friendGroup: self.data.friendGroup.concat(res.data.data.list),
              currentPage: self.data.currentPage + 1,
              finish: false
            })
          }

        }

      }
    })
  },

  getUser() {
    let self = this
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 100,
      success() {
        self.setData({
          draw: true
        })
        self.drawCanvas()
      }
    })


    // if (this.data.userInfo.nickName) {
    //   this.share()
    //   let self = this
    //   setTimeout(() => {
    //     self.drawCanvas()
    //   }, 10)
    // } else {
    //   wx.getUserInfo({
    //     success: (res) => {
    //       this.share()
    //       this.setData({
    //         userInfo: res.userInfo
    //       })
    //       let self = this
    //       setTimeout(() => {
    //         self.drawCanvas()
    //       }, 10)
    //     },
    //     fail: (err) => {
    //       wx.showToast({
    //         title: '授权失败',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //       setTimeout(() => {
    //         self.setData({
    //           draw: false
    //         })
    //       }, 200)

    //     }
    //   })
    // }

  },
  closePop() {
    this.setData({
      share: false
    })
    this.setData({
      draw: false
    })
  },
  share() {
    this.setData({
      share: true
    })
  },
  drawCanvas() {
    this.setData({
      choose: false
    })
    wx.showLoading({
      title: ' 海报生成中',
    })
    // let random = Math.round(Math.random());
    // if(random>0.5){
    //   this.setData({
    //     cardPath: this.data.cardPath1
    //   });
    // }else{
    //   this.setData({
    //     cardPath: this.data.cardPath2
    //   });
    // }

    this.setData({
      cardPath: this.data.imgUrls[this.data.index]
    });

    this.setData({
      cardPath: this.data.cardPath,
      // headPath: this.data.userInfo.avatarUrl,
      // sendName: this.data.userInfo.nickName,
      codeUrl: this.data.codeUrl
    });

    let ctx = wx.createCanvasContext('myCanvas');
    wx.getImageInfo({
      src: this.data.cardPath,
      success: (res) => {

        ctx.drawImage(res.path, 0, 0, 250, 440);

        wx.getImageInfo({
          src: this.data.codeUrl,
          success: (res) => {
            console.log(res)
            ctx.beginPath();
            ctx.drawImage(res.path, 180, 365, 55, 55);
            ctx.restore();
            ctx.draw();
            wx.hideLoading()
            this.share()
          }
        })

        // wx.getImageInfo({
        //   src: this.data.userInfo.avatarUrl,
        //   success: (res) => {
        //     ctx.save();

        //     // ctx.beginPath();
        //     // ctx.arc(35, 40, 15, 0, 2 * Math.PI)
        //     // ctx.clip();
        //     // ctx.drawImage(res.path, 20, 25, 30, 30);
        //     // ctx.restore();

        //     // ctx.setTextAlign('left');
        //     // ctx.setTextBaseline('middle');
        //     // ctx.setFontSize(12);
        //     // ctx.setFillStyle('#fff');
        //     // this.fontLineFeed(ctx, this.data.sendName, 270, 20, 65, 13);
        //     ctx.setStrokeStyle('transparent')
        //     ctx.stroke();

        //     wx.getImageInfo({
        //       src: this.data.codeUrl,
        //       success: (res) => {
        //         ctx.beginPath();
        //         ctx.drawImage(res.path, 180, 365, 55, 55);
        //         ctx.restore();
        //         ctx.draw();
        //         wx.hideLoading()
        //       }
        //     })
        //   }
        // })

      },
      fail: (err) => {
        // console.log(err)
      }
    })


  },

  saveImage(e) {
    // console.log(e)
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {

        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            // console.log(result, 'result')
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail(err) {
            // console.log(err, 'err')
          }
        })


      }
    })
  },

  fontLineFeed(ctx, str, splitLen, strHeight, x, y) {
    let strArr = [];
    for (let i = 0, len = str.length / splitLen; i < len; i++) {
      strArr.push(str.substring(i * splitLen, i * splitLen + splitLen));
    }
    let s = 0;
    for (let j = 0, len = strArr.length; j < len; j++) {
      s = s + strHeight;
      ctx.fillText(strArr[j], x, y + s);
    }
  },
  choosePic(){
    this.setData({
      choose:true
    })
  },
  closePicBox(){
    console.log(this.data.index)
    this.setData({
      choose:false
    })
  },
  closeShare(){
    this.setData({
      share: false
    })
    this.setData({
      choose: true
    })
  },
  changeCurrent(e){
    this.setData({
      index: e.detail.current,
      current: e.detail.current
    })
  },
  goRules(){
    wx.navigateTo({
      url: '../rules/rules'
    })
  },
  closeAll(){
    this.setData({
      share: false,
      choose: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

            self.getFriendList(self.data.currentPage)

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
                console.log(res)
                self.setData({
                  user: res.data.data
                })

              },
              fail: (res) => {

              }
            })

            wx.getStorage({
              key: 'me',
              success(res) {
                self.setData({
                  accountId: JSON.parse(res.data).account_id
                })
                wx.request({
                  url: self.data.apiurl + 'api/v2/mini/getCustomerQrCode',
                  method: 'GET',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'access-token': self.data.accessToken
                  },
                  data: {
                    batch_code: 2,
                    customer_id: self.data.customerId,
                    account_id: self.data.accountId
                  },
                  success(res) {
                    console.log(res.data)
                    if (res.data.code == '0') {
                      console.log(res.data.data.qr_code)
                      self.setData({
                        codeUrl: res.data.data.qr_code
                      })
                    }

                  }
                })
              }
            })

          }
        })


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

  },
  onReachBottom: function () { //触底开始下一页
    if (!this.data.finish) {
      this.getFriendList(this.data.currentPage)
    }

  },
})