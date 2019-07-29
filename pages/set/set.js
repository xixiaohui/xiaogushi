Page({



  onShareAppMessage() {
    return {
      title: '所有古诗',
      path: 'page/set/set'
      
    }
  },

  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    poetry: {},
    
  },

  setPoetry:function(){
    var pages = getCurrentPages();
    var prevPages= pages[pages.length -2];

    this.setData({
        poetry:prevPages.data.poetry
    })


  },

  onLoad: function () {
    this.setPoetry();

  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  // navigateTo() {
  //   wx.navigateTo({ url: '../index/index' })
  // },

})
