// pages/dm/dm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    flyText: "我是小古诗最火弹幕！",
    flyDuration: 10000,
    textColor: "rgb(255,0,155)",
    
    textArr:{},

    //弹幕数据
    dmdata: {},
    //弹幕当前索引值
    barragecount: 0,
  },

  //设置弹幕
  setDmData: function () {
    let data = require('/dmdata.js');
    this.setData({ dmdata: data.dataList })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setDmData()

    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenHeight: res.screenHeight,
          screenWidth: res.screenWidth
        });
      }
    });
    //分享
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.initBarrage(this.data.flyText);
    this.initBarrageH(this.data.flyText);
    this.startBarrageAnimation();
  },


  //初始化横向弹幕
  initBarrageH:function(flyText){
    var textArr = flyText.split("");
    var screenWidth = this.data.screenWidth; //rpx计算调整位置
    console.log("screenWidth = " + screenWidth)
    //计算动画移动X值
    var transXWidth = screenWidth * textArr.length / 5;

    console.log("textArr.length= " + textArr.length + " transXWidth = " + transXWidth)

    this.setData({
      screenWidth: screenWidth,
      transXWidth: transXWidth,
      textArr: textArr,
    });
  },

  startBarrageAnimation:function(){
    //开始循环执行
    this.barrageAnimationH();

    // 定时执行
    this.inter_id = setInterval(function () {
      this.barrageAnimationH();
    }.bind(this), this.data.flyDuration);

  },
  

  //定时器，让弹幕横着飞
  barrageAnimationH: function () {
    //开始弹幕滚动
    if (!this.animation) {
      this.animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'linear'
      });
    }

    //动画恢复到原位
    this.animation.translateX(this.data.screenWidth).step();
    this.setData({
      textArr: [], //文字清空的动画效果
      animationData: this.animation.export()
    });

    
    //更改文字
    this.setData({
      flyText: this.data.dmdata[0].dmText[this.data.barragecount]
    })

    this.data.barragecount +=1
    if (this.data.barragecount >= this.data.dmdata[0].dmText.length){
      this.data.barragecount = 0;
    }
    console.log(this.data.flyText)
    this.initBarrageH(this.data.flyText);

    //延迟0.1s执行
    setTimeout(function () {
      this.animation.translateX(-this.data.transXWidth).step({ duration: this.data.flyDuration });
      this.setData({
        textArr: this.data.flyText.split(""),
        animationData: this.animation.export()
      });
    }.bind(this), 100);
  },

  //初始化弹幕
  initBarrage: function (flyText) {
    var textArr = flyText.split("");
    console.log("textArr= " + textArr)
    var screenHeight = this.data.screenHeight; //rpx计算调整位置
    //px计算动画移动Y值
    var transYHeight = screenHeight * textArr.length / 5; 
    console.log("transYHeight= " + transYHeight)
    console.log(screenHeight);

    this.setData({
      screenHeight: screenHeight,
      transYHeight: transYHeight,
      textArr: textArr,
    });

    //开始循环执行
    this.barrageAnimation();

    //定时执行
    this.inter_id = setInterval(function () {
      this.barrageAnimation();
    }.bind(this), this.data.flyDuration);

  },

  //定时器 让弹幕飞起来 
  barrageAnimation: function () {
    //开始弹幕滚动
    if (!this.animation) {
      this.animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'linear'
      });
    }
    
    //动画恢复到原位
    this.animation.translateY(this.data.screenHeight).step();
    this.setData({
      textArr: [], //文字清空的动画效果
      animationData: this.animation.export()
    });
    

    //延迟0.1s执行
    setTimeout(function () {
      this.animation.translateY(-this.data.transYHeight).step({ duration: this.data.flyDuration });
      this.setData({
        textArr: this.data.flyText.split(""),
        animationData: this.animation.export()
      });
    }.bind(this), 100);
  },
  

  //设置弹幕
  formSubmit: function (e) {
    var flyText = e.detail.value["flyText"];
    if (flyText) {
      var textArr = flyText.split("");
      var screenHeight = this.data.screenHeight; //rpx计算调整位置
      //px 计算动画移动Y值
      var transYHeight = screenHeight * textArr.length / 5; 

      this.setData({
        flyText: flyText,
        screenHeight: screenHeight,
        transYHeight: transYHeight,
        textArr: textArr,
      });

    }
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