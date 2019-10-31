const app = getApp()

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytitle: "我的",

    date:0,

    list: [
      {
        text: "主页",
        iconPath: "/images/outline_home_black_36dp.png",
        selectedIconPath: "/images/outline_home_black_36dp.png",
      },
      {
        text: "搜索",
        iconPath: "/images/search-24px.svg",
        selectedIconPath: "/images/search-24px.svg",
      },
      {
        text: "更多",
        iconPath: "/images/outline_more_black_36dp.png",
        selectedIconPath: "/images/outline_more_black_36dp.png",
        badge: '1000+'
      },
      {
        text: "我的",
        iconPath: "/images/outline_face_black_36dp.png",
        selectedIconPath: "/images/outline_face_black_36dp.png",
        // badge: 'New'
      }],

  },

  tabChange: function (e) {
    let index = e.detail.index;

    const HOME = 0;
    const SEARCH = 1
    const MORE = 2;
    const MY = 3;

    if (index == MORE) {
      wx.redirectTo({
        url: '/pages/more/more',
      })
    } else if (index == MY) {
      wx.redirectTo({
        url: '/pages/my/my',
      })
    } else if (index == HOME) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    } else if (index == SEARCH) {
      wx.redirectTo({
        url: '/pages/search/search',
      })
    }
  },

  //设置时间
  setDate:function(){
    let date = new Date();
    let mon = date.getMonth() + 1;
    this.setData({
      date: date.getFullYear() + "/" + mon + "/" + date.getDate()
    })
  },

  //点击我的语音
  tapVoice:function(){
    console.log("tap------------------tapVoice")



  },
  tapLabel: function () {
    console.log("tap------------------tapLabel")

    wx.navigateTo({
      url: '/pages/mylabel/mylabel',
    })
  },
  tapHeart: function () {
    console.log("tap------------------tapHeart")

    wx.navigateTo({
      url: '/pages/myfav/myfav',
    })
  },
  tapAuthorList: function () {
    console.log("tap------------------tapAuthorList")

    wx.navigateTo({
      url: '/pages/myauthlist/myauthlist',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setDate();
    this.setData({
      version: app.globalData.version
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