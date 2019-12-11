// pages/Invitate/Invitate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends:10,
    friendGroup:[
      {
        avatar:'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/boy.png',
        name:'boy'
      },
      {
        avatar: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/girl.png',
        name: 'girl'
      }
    ],

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
    codeUrl: 'https://elite-league.oss-cn-shanghai.aliyuncs.com/mini/code.png',
    apiurl: 'https://app.hsuanhuai.com/',
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
      }
    })

    if (this.data.userInfo.nickName) {
      this.share()
      let self = this
      setTimeout(() => {
        self.drawCanvas()
      }, 10)
    } else {
      wx.getUserInfo({
        success: (res) => {
          this.share()
          this.setData({
            userInfo: res.userInfo
          })
          let self = this
          setTimeout(() => {
            self.drawCanvas()
          }, 10)
        },
        fail: (err) => {
          wx.showToast({
            title: '授权失败',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            self.setData({
              draw: false
            })
          }, 200)

        }
      })
    }

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
    wx.showLoading({
      title: ' 海报生成中',
    })
    let random = Math.round(Math.random());
    if(random>0.5){
      this.setData({
        cardPath: this.data.cardPath1
      });
    }else{
      this.setData({
        cardPath: this.data.cardPath2
      });
    }

    this.setData({
      cardPath: this.data.cardPath,
      headPath: this.data.userInfo.avatarUrl,
      sendName: this.data.userInfo.nickName,
      codeUrl: this.data.codeUrl
    });
    // console.log(this.data.codeUrl)

    let ctx = wx.createCanvasContext('myCanvas');
    wx.getImageInfo({
      src: this.data.cardPath,
      success: (res) => {

        ctx.drawImage(res.path, 0, 0, 250, 440);

        wx.getImageInfo({
          src: this.data.userInfo.avatarUrl,
          success: (res) => {
            ctx.save();

            // ctx.beginPath();
            // ctx.arc(35, 40, 15, 0, 2 * Math.PI)
            // ctx.clip();
            // ctx.drawImage(res.path, 20, 25, 30, 30);
            // ctx.restore();

            // ctx.setTextAlign('left');
            // ctx.setTextBaseline('middle');
            // ctx.setFontSize(12);
            // ctx.setFillStyle('#fff');
            // this.fontLineFeed(ctx, this.data.sendName, 270, 20, 65, 13);
            ctx.setStrokeStyle('transparent')
            ctx.stroke();

            wx.getImageInfo({
              src: this.data.codeUrl,
              success: (res) => {
                ctx.beginPath();
                ctx.drawImage(res.path, 180, 365, 55, 55);
                ctx.restore();
                ctx.draw();
                wx.hideLoading()
              }
            })
          }
        })

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