//index.js
//获取应用实例
const app = getApp()

var MapData = require('../map/mapData.js')

Page({
  data: {
    viewcontent:250,
    getfocus:false,
    searchMapData:"",
    mess:"",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          viewcontent:res.windowHeight*0.3
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  getValue:function(e){
    var that = this;
    that.setData({
      mess:"",
      searchMapData: e.detail.value
    })

  },

  search: function(){
   if(this.data.searchMapData == ""){
      wx.showModal({
        title: '提示',
        content: '搜索内容为空！',
      })
   }
   else {
     this.setData({
       mess: "搜索结果为："
     })

   }

  },
 


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
