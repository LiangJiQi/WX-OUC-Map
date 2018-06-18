//app.js

var first = 0;

App({
  onLaunch: function () {
    wx.reLaunch({
      url: '../../pages/map/map',
    })
  },

  onShow:function(){
    if(this.globalData.first){
      wx.redirectTo({
        url: '../../pages/help/help',
      })
    } else {
      wx.reLaunch({
        url: '../../pages/map/map',
      })
    }
  },

  onHide:function(){
    this.globalData.first = 1;
  },

  globalData: {
    userInfo: null
  }
})