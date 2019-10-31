const systemInfo = wx.getSystemInfoSync()

const PAGE_COUNT = 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    height: systemInfo.screenHeight -100,
    width: systemInfo.screenWidth,

    currentPoteries:[1,2,3,4,5],

    poetry: [],

    //指针
    flag:0,

    //swiper当前页索引
    current:0,

    //页数
    pages:0

    
    
    
  },

  //设置显示内容
  setCurrentPoteries:function(){
    var flag = this.data.flag;

    if(flag<0){
      flag = this.data.flag + this.data.poetry.length
    }

    var arrtemp = []

    for (var i = flag; i < PAGE_COUNT; i++){
      arrtemp.push(this.data.poetry[i]);
    }
    

    this.setData({
      currentPoteries: arrtemp
    })

    console.log("---setCurrentPoteries---")
    console.log(this.data.currentPoteries)
  },  
  
  posChange:function(e){
    // console.log(e.detail)
  },

  addFlag:function(){
    const that = this;

    // var calflag = Math.min(that.data.flag + 1, that.data.poetry.length);

    var calflag = that.data.flag + 1
    that.setData({
      flag: calflag,
    })
  },
  
  reduceFlag:function(){
    const that = this;
    // var calflag = Math.max(that.data.flag - 1, 0);
    var calflag = that.data.flag - 1
    that.setData({
      flag: calflag
    })
  },

  currentChange: function (e) {

    var that = this;
    let index = e.detail.current

    console.log("index = " + index)
    console.log("current = " + that.data.current)

    //往右滑动了 ++
    if (index == that.data.current + 1){
      that.setData({
        current:index,
      })
      console.log('往右滑动了 ++')

      this.addFlag()
    }

    //往左滑动 --
    else if (index == that.data.current - 1) {
      that.setData({
        current: index
      })
      console.log('往左滑动 --')

      this.reduceFlag()
    }

    else{
      
      if (index > that.data.current + 1){
        that.setData({
          current: index
        })

        console.log('往左滑动 --')
        this.reduceFlag()
      }else{
        that.setData({
          current: index
        })

        console.log('往右滑动 ++')
        this.addFlag()
      }
    }

    console.log('flag = '  +that.data.flag)

    that.setCurrentPoteries()
  },

  setPoetry: function () {

    // var that = this
    // wx.getStorage({
    //   key: 'all',
    //   success: function (res) {
    //     that.setData({ 
    //       poetry: res.data 
    //     })
    //   },
    // })

    let data = require('../index/data.js');
    this.setData({ poetry: data.dataList })

    var counts = Math.ceil(this.data.poetry.length / PAGE_COUNT);

    console.log(this.data.poetry.length)
    this.setData({
      pages: counts
    })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setPoetry()

    this.setCurrentPoteries()
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