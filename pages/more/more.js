// pages/more/more.js

// const createRecycleContext = require('miniprogram-recycle-view')

const systemInfo = wx.getSystemInfoSync()


function TextVoice(text) {
  // 属性
  this.text = text

  // 方法
  if (typeof this.setTextVoice !== 'function') {
    TextVoice.prototype.setTextVoice = function (text) {
      this.text = text
      console.log(this.text)
    }
  }

}

const KEY = ['index', 'ilike', 'ilist','SHOWPOETRYCOUNTS']

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
    height: systemInfo.screenHeight,
    width: systemInfo.screenWidth,

    classNote:'swiper_item_',


    poetry:{},
    //当前Swipter item 的索引
    current: 0,
    //显示的古诗数量
    showPoetryCounts: 5,

    //存用户是否收藏了这个古诗的标记flag 0为没有收藏，其他数值为收藏了
    favs: [],
    //存储用户是否标记古诗为列表元素了，flag 0为没有收藏，其他数值为收藏了
    listss:[],

    //控制显示古诗
    showPoetry:true,

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

  //响应点击like 
  clickLike:function(e){

    console.log('this.data.current = ' + this.data.current)
    var temparry = this.data.favs
    temparry[this.data.current] = (temparry[this.data.current]!=0)?0:1
    // console.log("temparry = " + temparry)

    this.setData({
      favs: temparry
    })
  },

  //响应点击list
  clickList:function(){
    var temparry = this.data.listss
    temparry[this.data.current] = (temparry[this.data.current] != 0) ? 0 : 1

    this.setData({
      listss: temparry
    })
  },

  //响应点击Voice
  clickVoice:function(){

    console.log("clickVoice")

    wx.navigateTo({
      url: '/pages/voice/voice',
    })
    // this.setData({
    //   showPoetry: this.data.showPoetry==true?false:true
    // })
  },
  
  

  //下方的tab变换跳转功能
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
  
  /***
   * 
   * 在swiper左右滚动的时候动态调整swiper-item的宽度和高度
   *
   * 在具体过程中，遇到一个问题，query.select('#id')查找不到任何元素
   * 
   * 但是退而求之，使用query.selectAll('.class')
   * 
   * 原因已找到，是在后面代码取元素的时候出现了问题
   */
  currentChange:function(e){
    if (!this.data.showPoetry) {
      return
    }

    var that  = this;
    // console.log(e.detail)
    let current = e.detail.current

    //保存当前古诗索引
    that.setData({
      current:current,
      showPoetryCounts: current+5
    })
    // console.log("showPoetryCounts= " + that.data.showPoetryCounts)

    const query = wx.createSelectorQuery()

    let myid = '#item_' + current
    // console.log("id = " + myid)
    console.log(query)
    // query.selectAll('.poetry_text').boundingClientRect()
    query.select(myid).boundingClientRect()

    query.exec(function(res){
      console.log(res)
      let w = parseInt(res[0].width)
      let h = parseInt(res[0].height)
      if (w > systemInfo.screenWidth){
        that.setData({
          width:w
        })
      }else{
        that.setData({
          width: systemInfo.screenWidth
        })
      }

      if(h>(that.data.height-100)/2){
        that.setData({
          height: 2*h
        })
      }else{
        that.setData({
          height: systemInfo.screenHeight
        })
      }
    })
  },

  
  

  //设置古诗收藏数组
  setFavs:function(){
    let len = this.data.poetry.length
    let val = [...Array(len)].map(_ => 0);

    console.log("len= " + len)
    console.log("-----setFavs -")
    console.log(val)

    // val[1] = 1

    this.setData({
      favs:val
    })

  },
  
  //设置标签数组
  setInList:function(){
    let len = this.data.poetry.length
    let val = [...Array(len)].map(_ => 0);

    this.setData({
      listss: val
    })
    
  },

  //保存数据
  save: function () {
    const that = this

    wx.setStorage({
      key: KEY[0],
      data: that.data.current,
    })
    wx.setStorage({
      key: KEY[1],
      data: that.data.favs,
    })

    wx.setStorage({
      key: KEY[2],
      data: that.data.listss,
    })

    wx.setStorage({
      key: KEY[3],
      data: that.data.showPoetryCounts,
    })
  },

  //获取存档
  getMyStorage: function () {
    const that = this

    wx.getStorage({
      key: KEY[0],
      success: function (res) {
        that.setData({
          current: res.data
        })
      },
    })

    wx.getStorage({
      key: KEY[1],
      success: function (res) {
        that.setData({
          favs: res.data
        })
      },
    })

    wx.getStorage({
      key: KEY[2],
      success: function (res) {
        that.setData({
          listss: res.data
        })
      },
    })

    wx.getStorage({
      key: KEY[3],
      success: function (res) {
        that.setData({
          showPoetryCounts: res.data
        })
      },
    })


    wx.getStorageInfo({
      success(res) {
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
      }
    })
  },

  //获取用户转发自带的参数
  getShareParameters:function(res){
    
    var that = this;
    that.setData({
      current: res.current
    })
  },

  //获取数据库中的所有古诗
  setPoetry: function () {

    const that = this
    wx.showLoading({
      title: '正在加载古诗列表，请稍等',
      mask: true,
      success: () => {
        let data = require('../index/data.js');
        that.setData({ poetry: data.dataList }, () => {
          wx.hideLoading()

          that.setFavs()
          that.setInList()
          that.getMyStorage()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    
    this.setPoetry()



    console.log("----------onLoad-----more.js------")
    if(JSON.stringify(res) != "{}"){
      console.log("----------onLoad-----getShareParameters------")
      console.log(res)
      this.getShareParameters(res)
    }
    
  },

  //监听元素
  viewPort: function () {
    const that = this

    var intersectionObserver = wx.createIntersectionObserver()
    intersectionObserver.relativeToViewport({ left: 100, right: 100 }).observe(this.data.classNote + this.data.current, (res) => {

      console.log(res.intersectionRect)

      if (res.intersectionRect.width > 0) {
        intersectionObserver.disconnect()

        viewPort()
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    this.viewPort()
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
    // console.log("onHide 页面隐藏了")
    // console.log("current = " + this.data.current)
    // wx.setStorage({
    //   key: 'index',
    //   data: this.data.current,
    // })
    this.save()
  },

 

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onHide 页面卸载了")
    console.log("current = " + this.data.current)
    
    this.save()
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
   * 点击分享按钮分享 share
   */
  onShareAppMessage: function (res) {

    var sharetitle = this.data.poetry[this.data.current].title
    var shareauthor = this.data.poetry[this.data.current].author

    var sharepath = 'pages/more/more?current=' + this.data.current
    
    return{
      title: sharetitle + " / " + shareauthor,
      path: sharepath
    }
  }
})