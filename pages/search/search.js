// pages/search/search.js
const systemInfo = wx.getSystemInfoSync()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytitle:"搜索",

    poetry: {},

    //存储搜索出的古诗
    searchPoetry:[],

    //
    width:systemInfo.screenWidth,
    height:systemInfo.screenHeight/2 + 100,


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

  tabChange:function(e){
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

  //获取匹配的古诗
  getTitleList: function (value){
    let titlelist = []
    let arr = this.data.poetry
    
    let searchportries = arr.filter(function(p){
      return (p.author == value)
    })
    console.log(searchportries)

    if (searchportries.length == 0){

    }else{
      
      this.setData({
        searchPoetry: searchportries
      })
 

      searchportries.forEach(function(item){
        titlelist.push({ 'text': item.title })
      
      })

        
      console.log(titlelist)
    }

    return titlelist
  },
  
  //搜索框回调函数
  search: function (value) {

    console.log("value= " +value)
    let titlelist = this.getTitleList(value)

    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve([{ text: '苏轼', value: 1}, { text: '杜甫', value: 2 }, { text: '李白', value: 3 },])
        // resolve(titlelist)
      }, 200)
    })
 
  },

  //选中搜索结果
  selectResult: function (e) {
    console.log('select result', e.detail)
  },

  //设置滚动区域的高度
  setScrollingHeight:function(){


    const query = this.createSelectorQuery()

    let that = this

    query.select('#search').boundingClientRect(function(rect){

      console.log(rect.bottom)

      that.setData({
        height: rect.bottom
      })
    })
    query.select('#tabbar').boundingClientRect(function (rect) {

      console.log(rect.top)
      that.setData({
        height: rect.top - that.data.height
      })
    })
    query.exec()


  },

  //获取数据库中的所有古诗
  setPoetry: function () {
    let data = require('../index/data.js');
    this.setData({ poetry: data.dataList })

    console.log(this.data.poetry)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })

    this.setPoetry()
    this.setScrollingHeight()
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