
const systemInfo = wx.getSystemInfoSync()
const KEY = ['index', 'ilike', 'ilist']


// pages/mylabel/mylabel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    height: systemInfo.screenHeight,

    labelPoetries:[]


  },


  //获取添加了标签的古诗
  setLabelPoetries:function(){
    let that = this

    var tempArr = []
    wx.getStorage({
      key: KEY[2],
      success: function(res) {
        // console.log(res.data)

        for(var i=0 ,len=res.data.length;i<len;i++){
          if(res.data[i] != 0){
            tempArr.push(that.data.poetry[i])
          }
        }
        // console.log(tempArr)

        that.setData({
          labelPoetries:tempArr
        })

      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = require('../index/data.js');
    this.setData({ poetry: data.dataList })

    // console.log(this.data.poetry)

    this.setLabelPoetries()


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