
const systemInfo = wx.getSystemInfoSync()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorList:[],

    height: systemInfo.screenHeight,
  },

  

  //filter去重
  unique:function(arr){

    return arr.filter(function(item,index,arr){

      return arr.indexOf(item,0) === index;
    })

  },

  setAuthorList: function () {
    
    let auth = []
    
    this.data.poetry.forEach(function(item){
      auth.push(item.author)
    })

    let arrtemp = this.unique(auth)

    console.log(arrtemp)

    this.setData({
      authorList: arrtemp
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = require('../index/data.js');
    this.setData({ poetry: data.dataList })


    this.setAuthorList()
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