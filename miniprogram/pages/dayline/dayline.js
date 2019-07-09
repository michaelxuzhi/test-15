const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mydata: [],
    color: ["#BF3EFF", "#8E388E", "#63B8FF", "#FF1493"],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,

    bigImg: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //时间轴界面的小点颜色，采用随机颜色
    var color1 = this.data.color[Math.floor(Math.random() * this.data.color.length)];
    var color2 = this.data.color[Math.floor(Math.random() * 3)];
    this.setData({
      colormy: color1,
      colormy1: color2
    })




    // var year = new Date().getFullYear();
    // var month = new Date().getMonth() + 1;
    // var data = new Date().getDate();
    // var year1 = year + "年";
    // var date1 = month + "月" + data + "日";
    // this.setData({
    //   time1: year1,
    //   time2: date1
    // })

    // var hour = new Date().getHours();
    // if(hour<12){
    //   this.setData({
    //     china_time : "上午"
    //   }) 
    // }else{
    //   this.setData({
    //     china_time : "下午"
    //   })
    // }

    db.collection('kurtery1').get({
      success: res => {
        this.setData({
          mydata: res.data,
        })




        // for(var i=0; i<=res.data.length;i++)
        // {
        //   if (parseFloat(res.data[i].time.replace(/:/g, ''))/100<12){
        //       this.setData({
        //         china_time:true
        //       })
        //   }
        //   else{
        //       this.setData({
        //         china_time:false
        //       })
        //   }
        // }

        // res.data 是包含以上定义的两条记录的数组
        this.setData({
          mydata: res.data,
        })
        //这是对index中选择的时间的一个console 
        //console.log(parseFloat(res.data[0].time.replace(/:/g, '')) / 100) 
      },
      fail: err => {
        console.error(error);
      }
    })

  //   db.collection('users').get({
  //     success: res => {
  //       console.log(res.data.bigImg);
  //       this.setData({
  //         bigImg: res.data,
  //       })
  //     }
  //   })
  },


  touchstart(e) {
    this.startTime = e.timeStamp;
    console.log(e.timeStamp);
  },

  touchend(e) {
    this.endTime = e.timeStamp;
    console.log(e.timeStamp);
  },

  longpress(event) {
    if (this.endTime - this.startTime > 350);
    // console.log("长按");
    let id = event.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function(e) {
        if (e.confirm) {
          // 用户点击了确定 可以调用删除方法了
          const db = wx.cloud.database();
          db.collection("kurtery1").doc(id).remove({
            success: res => {
              wx.showToast({
                title: '删除成功',
              })
              this.onLoad() //删除成功重新加载
            },
            fail: err => {
              wx.showToast({
                title: '删除失败',
              })
            }
          })
        } else if (e.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },


  // color_choose(){
  //   var color1 = Math.random()*(color.length);
  //   console.log(color1);
  // },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    wx.startPullDownRefresh(
        db.collection('kurtery1').get({
          success: res => {
            // console.log(res.data[0]) ;
            this.setData({
              mydata: res.data
            })
          }
        })
      ),
      wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})