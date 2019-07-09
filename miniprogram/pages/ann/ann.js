wx.cloud.init();
const db = wx.cloud.database();

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    time: '12:01',
    date: '2019-04-02',
    region: ['广东省', '广州市', '海珠区'],
    modalName: null,
    textareaAValue: '',
    day_sent: "我爱我柔啊！",
    index: null,
    // imgList: [],
    bigImg: null,
    imgHeight1: " ",
    modalImg: ["https://attach.bbs.miui.com/forum/201901/01/035544tbp3st47kucubcus.jpg.thumb.jpg",
      "https://kurtery-00904xu.tcb.qcloud.la/iso-republic-pastel-geometric-shape-two-tone.jpg?sign=4f70c919059c6be8d3e126c1b79781b8&t=1555737779",
      "https://kurtery-00904xu.tcb.qcloud.la/512369.5593152309.jpg?sign=d33939426af4c0cd88efee86d8a9ec8c&t=1555737824"],
    modalImg2: " ",
  },

  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },






  // ChooseImage() {

  //   wx.chooseImage({
  //     count: 1, //默认9
  //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album'], //从相册选择
  //     success: (res) => {
  //       if (this.data.imgList.length != 0) {
  //         console.log(res.tempFilePaths);
  //         this.setData({
  //           imgList: this.data.imgList.concat(res.tempFilePaths)
  //         })
  //       } else {
  //         console.log(res.tempFilePaths);
  //         this.setData({
  //           imgList: res.tempFilePaths
  //         })
  //       }
  //     }
  //   });
  // },
  // ViewImage(e) {
  //   wx.previewImage({
  //     urls: this.data.bigImg,
  //     current: e.currentTarget.dataset.url
  //   });
  // },
  // DelImg(e) {
  //   wx.showModal({
  //     title: '',
  //     content: '确定要删除这张照片吗？',
  //     cancelText: '再看看',
  //     confirmText: '确定',
  //     success: res => {
  //       if (res.confirm) {
  //         this.data.imgList.splice(e.currentTarget.dataset.index, 1);
  //         this.setData({
  //           bigImg: this.data.bigImg
  //         })
  //       }
  //     }
  //   })
  // },






  SetShadow(e) {
    this.setData({
      shadow: e.detail.value
    })
  },
  SetBorderSize(e) {
    this.setData({
      bordersize: e.detail.value
    })
  },


  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openid);
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getScreenInfo();


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    this.getOpenid();
  },


  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })


  },


  insert() {
    db.collection("kurtery1").add({
      data: {
        time: this.data.time,
        date: this.data.date,
        region: this.data.region,
        textareaAValue: this.data.textareaAValue,
        // imgList: this.data.imgList
        bigImg: this.data.bigImg,
      },
      success: res => {
        console.log(this.bigImg)
        wx.showToast({
          title: '插入成功',
        })
        this.onShow();
      },
      fail: err => {
        wx.showModal({
          title: '失败',
          content: '网络不给力！',
        })
      },
    })
  },


  cancel() {
    wx.navigateTo({
      url: '../dayline/dayline',
    })
  },



  showModal(e) {
    var modalImg1 = this.data.modalImg[Math.floor(Math.random() * this.data.modalImg.length)];
    console.log(modalImg1)
    this.setData({
      modalImg2: modalImg1
    })

    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
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
    this.setData({
      time: '12:01',
      date: '2019-04-02',
      region: ['广东省', '广州市', '海珠区'],
      modalName: null,
      textareaAValue: ' ',
      day_sent: "我爱我柔啊！",
      index: null,
      // imgList: [],
      bigImg: null,
      imgHeight1: " ",
      modalImg: ["https://attach.bbs.miui.com/forum/201901/01/035544tbp3st47kucubcus.jpg.thumb.jpg",
        "https://kurtery-00904xu.tcb.qcloud.la/iso-republic-pastel-geometric-shape-two-tone.jpg?sign=4f70c919059c6be8d3e126c1b79781b8&t=1555737779",
        "https://kurtery-00904xu.tcb.qcloud.la/512369.5593152309.jpg?sign=d33939426af4c0cd88efee86d8a9ec8c&t=1555737824"],
      modalImg2: " ",
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

  // 上传图片
  changeBigImg() {
    let that = this;
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              bigImg: res.fileID//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            wx.showToast({
              title: '图片存储成功',
              'icon': 'none',
              duration: 3000
            })
          },
          fail: function () {
            wx.showToast({
              title: '图片存储失败',
              'icon': 'none',
              duration: 3000
            })
          }
        });
      },
      fail: e => {
        console.error('[上传图片] 失败：', e)
      },
      complete: () => {
        wx.hideLoading()
      }
    });
  },

  getScreenInfo() {
    wx.getSystemInfo({
      success: res => {
        var windowHeight = res.windowHeight;
        console.log(windowHeight);
        var imgHeight2 = (windowHeight - 320) * 2 + "rpx";
        console.log(imgHeight2);
        this.setData({
          imgHeight1: imgHeight2
        })
      }
    })
  },

  location() {
    wx.navigateTo({
      url: '../location/location',
    })
  }


})