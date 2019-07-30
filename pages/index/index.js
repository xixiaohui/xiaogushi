//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    
    //保存数据库中的所有古诗
    poetry:{},
    //当天显示的古诗
    todayPoetry:{
      "title": "枫桥夜泊",
      "dynasty": "唐代",
      "author": "张继",
      "text": "月落乌啼霜满天，\n江枫渔火对愁眠。\n姑苏城外寒山寺，\n夜半钟声到客船。"
    },
    //当天显示古诗的索引
    poetry_index:0,
    //存放古诗的每一个字
    words:[],
    //存放古诗的每一个句子
    sentences:[],

    //初始时间
    starttime:"2019-06-30 00:00:00",
    //已经过去几天
    passDays:0,

    //当前日期
    date:0,

    //share data
    shareData: {
      title: '一天一首古诗',
      desc: '小古诗',
      path: 'pages/index/index'
    },
    //画布隐藏
    hidden:true,

    //屏幕宽高
    width:0,
    height:0,

    //个人信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    //诗歌显示样式
    writingMode: "vertical-rl",

    //弹幕属性
    flyText: "我是小古诗最火弹幕！",
    flyDuration: 10000,
    textColor: "rgb(255,0,155)",
    textArr: {},
    //弹幕数据
    dmdata: {},
    //弹幕当前索引值
    barragecount: 0,

    //版本标记
    version: "",
  },

  //设置弹幕
  setDmData: function () {
    let data = require('../dm/dmdata.js');
    this.setData({ dmdata: data.dataList })
  },
  
  //初始化横向弹幕
  initBarrageH: function (flyText) {
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

  startBarrageAnimation: function () {
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
    // this.animation.translateY(0).step();
    this.setData({
      textArr: [], //文字清空的动画效果
      animationData: this.animation.export()
    });


    //更改文字
    this.setData({
      flyText: this.data.dmdata[0].dmText[this.data.barragecount]
    })

    this.data.barragecount += 1
    if (this.data.barragecount >= this.data.dmdata[0].dmText.length) {
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
  

  //调整字体显示顺序（如何通过js代码控制样式）
  setWritingMode: function () {

    console.log(this.data.todayPoetry.text.length)
    if (this.data.todayPoetry.text.length > 36 ){
      this.setData({
        writingMode: "horizontal-tb"
      })
    }
  },
  
  setVwh:function(){
    this.setData({
      width:wx.getSystemInfoSync().windowWidth
    })

    this.setData({
      height: wx.getSystemInfoSync().windowHeight
    })

    console.log("vw = " + this.data.width);
    console.log("vh = " + this.data.height)
  },

  setPoetry: function (){
    let data = require('/data.js');
    this.setData({ poetry: data.dataList})
  },

  setTodayPoetry:function(index){
    var len = this.data.poetry.length;
    console.log("len= " + len +"index = "+ index);
    if(index>=len){
      index = len-1;
    }
    if(index<=0){
      index = 0;
    }
    this.setData({ todayPoetry : this.data.poetry[index]})
  },

  setWords:function(){
    var values = this.data.todayPoetry.text;
    var icount = values.length;
    var arr=[];
    for(var i=0;i<icount;i++){
      arr.push(values[i]);
    }
    this.setData({ words: arr })
  },

  setSentences:function(){
    var values = this.data.todayPoetry.text.split('\n');

    //添加‘\n’
    for(var i=0;i< values.length;i++){
      // console.log(values[i]);
      // values[i].contact('\n');
      values[i] = values[i]+'\n';
    }
    this.setData({ sentences: values })
  },

  //设置过去天数
  setPassDays:function(){
    var val = this.timeFn(this.data.starttime);
    this.setData({ passDays: val });

    this.setData({poetry_index:this.data.passDays});
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  navigateTo() {
    wx.navigateTo({ url: '../set/set' })
  },

  handleTapShareButton() {
    if (!((typeof wx.canIUse === 'function') && wx.canIUse('button.open-type.share'))) {
      wx.showModal({
        title: '当前版本不支持转发按钮',
        content: '请升级至最新版本微信客户端',
        showCancel: false
      })
    }
  },

  onShareAppMessage() {
    return this.data.shareData
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

//网络拷贝的计算时间差的函数
  timeFn:function(d1) {//di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
    var dateEnd = new Date();//获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    // var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    // var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    // //计算相差分钟数
    // var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    // var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    // //计算相差秒数
    // var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    // var seconds = Math.round(leave3 / 1000)
    // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
    //   , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
    console.log(" 相差 " + dayDiff + "天 " );
    return dayDiff;
  },

  drawPoetry:function(){
    const ctx = wx.createCanvasContext('myCanvas', this);

    ctx.setFontSize(20);
    ctx.fillText(this.data.todayPoetry.title, 20, 20);
    ctx.fillText(this.data.todayPoetry.dynasty, 20, 50);
    ctx.fillText(this.data.todayPoetry.author, 20, 100);
    ctx.fillText(this.data.todayPoetry.text, 20, 150);
    ctx.draw();
  },

  //绘制海报图片
  draw: function (){
    // this.drawPoetry();
    var that = this
    const ctx = wx.createCanvasContext('myCanvas', that);
    
    ctx.drawImage('../../image/bg.jpg', 0, 0, 1080, 1350, 0, 0, that.data.width, that.data.height)
    ctx.drawImage('../../image/xuan.jpg', that.data.width - 100, that.data.height - 100, 100, 100)

    ctx.draw();

  },


  getAv:function(){
    var that = this
    const ctx = wx.createCanvasContext('myCanvas', that);

    wx.downloadFile({
      url: this.data.userInfo.avatarUrl,
      success: function (res) {
        if(res.statusCode == 200){
         

          ctx.drawImage('../../image/bg.jpg', 0, 0, 1080, 1350, 0, 0, that.data.width, that.data.height)
          ctx.drawImage('../../image/xuan.jpg', that.data.width - 90, that.data.height-90,80,80)
          ctx.drawImage(res.tempFilePath, that.data.width/2-25, that.data.height - 90, 50, 50)
          ctx.setFontSize(15)
          ctx.fillText(that.data.userInfo.nickName, that.data.width / 2 - 15, that.data.height - 20)
          ctx.draw(false, that.share)


        }
      }
    })

  
    
  },

  //保存到相册
  save: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#000000',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          },
        })
      }
    })
  },

  //生成分享图
  share: function () {

    var that = this;
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      fileType: 'jpg',
      quality: 0.8,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log("res.tempFilePath= " + res.tempFilePath);
        // console.log(res);
        that.setData({
          prurl: res.tempFilePath,
          hidden: true
        })

        wx.hideLoading()
        wx.previewImage({
          urls: [res.tempFilePath]
        })

      },
      fail: function (res) {
        wx.showToast({
          title: "保存失败",
          icon: "loading"
        })
      }
    })
  },

  myShare: function () {
    this.getAv();
    // this.draw();
    
  },

  setAnimation:function(){
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    // this.animation.export()
    // this.animation = animation;

  },

  onLoad: function () {
    
    this.setPassDays();
    this.setPoetry();
    this.setTodayPoetry(this.data.poetry_index);
    this.setWords();
    this.setSentences();
    this.setVwh();
    this.setWritingMode();
    this.setAnimation();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.setData({
      version: app.globalData.version
    })
  },

  onReady: function () {
    
    // this.initBarrage(this.data.flyText);
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenHeight: res.screenHeight,
          screenWidth: res.screenWidth
        });
      }
    });

    this.setDmData()
    this.initBarrageH(this.data.flyText);
    this.startBarrageAnimation();
  },

})
