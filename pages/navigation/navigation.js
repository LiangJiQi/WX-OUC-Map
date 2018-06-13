//index.js
//获取应用实例
const app = getApp()

var MapData = require('../map/mapData.js')
import ans from 'ans.js'

Page({
  data: {
    viewSearch:250,
    viewAns:500,
    getfocus:false,
    searchMapData:"",
    mess:"",
    MapDataList:[],
    searchAns:[],
    fullWindows:700,
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
          viewSearch:res.windowHeight*0.2,
          viewAns:res.windowHeight*0.8-24.6,
          fullWindows:res.windowHeight
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    that.setData({
      MapDataList:MapData
    })
  },

  getValue:function(e){
    var that = this;
    that.setData({
      searchMapData: e.detail.value
    })

  },

  search: function(){
    ans.ansLaLo.latitude = 0
    ans.ansLaLo.longitude = 0
    this.setData({
      searchAns:[]
    })
   if(this.data.searchMapData == ""){
      wx.showModal({
        title: '提示',
        content: '搜索内容为空！',
      })
   }
   else {
     var j = 0
     for (var i = 0;i < this.data.MapDataList.MapDataList.length;i++){
       if(this.data.MapDataList.MapDataList[i].name.indexOf(this.data.searchMapData) >= 0){
         var temp1 = "searchAns["+j+"].name"
         var temp2 = "searchAns["+j+"].info"
         var temp3 = "searchAns["+j+"].index"
         this.setData({
           mess: "搜索结果为：",
           [temp1]:this.data.MapDataList.MapDataList[i].name,
           [temp2]:this.data.MapDataList.MapDataList[i].info,
           [temp3]:i
         })
         j++;
       }
       }
     if (j == 0) {
       wx.showModal({
         title: '提示',
         content: '搜不到>_<  请尝试修改搜索词',
       })
     }
   }
  },
 
  toShowMap:function(e){
      var mapAns = e.currentTarget.dataset.org;
      ans.ansLaLo.latitude = this.data.MapDataList.MapDataList[mapAns].latitude3
      ans.ansLaLo.longitude = this.data.MapDataList.MapDataList[mapAns].longitude3
      wx.switchTab({
        url: '../map/map',
      })
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
