//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scrollHeight:500,
  },

  start:function(){
    wx.reLaunch({
      url: '../map/map',
    })
  },

  upbug:function(){
    wx.showModal({
      title: '提示',
      content: '目前你可以添加小哥哥微信，上报bug。',
      success:function(res){
        if(res.confirm){
          wx.setClipboardData({
            data: 'MateTuring',
            success:function(res){
              wx.showToast({
                title: '成功复制微信号至剪切板！',
                icon: 'success',
                duration: 2000,
                mask: true,
              })
            }
          })
        }
      }
    })
  },

  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
        
      },
    })
  },

})
