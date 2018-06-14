//index.js
//获取应用实例
const app = getApp();

var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;

var MapData = require('../map/mapData.js')
import ans from '../navigation/ans.js'

Page({
  data: {
    latitude: 36.16318553931523,
    longitude: 120.49668997154236,
    mapHeight:400,
    scrollHeight:400,
    fullScreenHeight:700,
    showMapData:false,
    showMarkersMapData:false,
    moveMap:false,
    mapDataList:[],
    showPointData:[{
      id: 0,
      latitude1: 0,
      latitude2: 0,
      longitude1: 0,
      longitude2: 0,
      name: '',
      info: ""
    },{
        id: 0,
        latitude1: 0,
        latitude2: 0,
        longitude1: 0,
        longitude2: 0,
        name: '',
        info: ""
    }],
    markers: [{
      iconPath: "../../icon/resources/others.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      title:"",
      callout:{
        content:"暂无介绍>_<",
        color: "#FFFFFF",
        bgColor:"#70DB93",
        display:'ALWAYS',
        textAlign:"center"
      },
      width: 32,
      height: 32
     },
     {
       iconPath: "../../icon/resources/location.png",
       id:1,
       latitude:0,
       longitude:0,
       title:"",
       callout: {
         content: "暂无介绍>_<",
         color: "#FFFFFF",
         bgColor: "#70DB93",
         display: 'ALWAYS',
         textAlign: "center"
       },
       width:32,
       height:32
     }],
    controls: [{
      id: 2,
      iconPath: '../../icon/resources/gps.png',
      position: {
        left: 0,
        top:0,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
    
    findMapData: function (that) {
      for (var i = 0; i < that.data.mapDataList.MapDataList.length; i++) {
        var temp1 = 'markers[0].title'
        var temp2 = 'markers[0].callout.content'
        if (that.data.markers[0].latitude <= that.data.mapDataList.MapDataList[i].latitude1 && that.data.markers[0].latitude >= that.data.mapDataList.MapDataList[i].latitude2 && that.data.mapDataList.MapDataList[i].longitude1 >= that.data.markers[0].longitude && that.data.mapDataList.MapDataList[i].longitude2 <= that.data.markers[0].longitude) {

          var temp = 'showPointData[0]'
          if(that.data.moveMap == false){
          that.setData({
            [temp]: that.data.mapDataList.MapDataList[i],
            [temp1]: that.data.mapDataList.MapDataList[i].name,
            [temp2]: that.data.mapDataList.MapDataList[i].name,
            showMapData: true,
            moveMap:true
          })
          }
          break;
        }
        else if (i == that.data.mapDataList.MapDataList.length - 1) {
          if (that.data.markers[0].title == "") {
            that.setData({
              showMapData: false
            })
          }
          else {
            that.setData({
              [temp1]: "",
              [temp2]: "暂无介绍>_<",
              showMapData: false
            })
          }
        }
      }
      for (var i = 0; i < that.data.mapDataList.MapDataList.length; i++) {
        var temp1 = 'markers[1].title'
        var temp2 = 'markers[1].callout.content'
        if (that.data.markers[1].latitude <= that.data.mapDataList.MapDataList[i].latitude1 && that.data.markers[1].latitude >= that.data.mapDataList.MapDataList[i].latitude2 && that.data.mapDataList.MapDataList[i].longitude1 >= that.data.markers[1].longitude && that.data.mapDataList.MapDataList[i].longitude2 <= that.data.markers[1].longitude) {
          var temp = 'showPointData[1]'
          if(that.data.moveMap == false){
          that.setData({
            [temp]: that.data.mapDataList.MapDataList[i],
            [temp1]: that.data.mapDataList.MapDataList[i].name,
            [temp2]: that.data.mapDataList.MapDataList[i].name,
            showMarkersMapData: true,
            moveMap:true
          })
        }
          break;
        }
        else if (i == that.data.mapDataList.MapDataList.length - 1) {
          if (that.data.markers[1].title == "") {
            that.setData({
              showMarkersMapData: false
            })
          }
          else {
            that.setData({
              [temp1]: "",
              [temp2]: "暂无介绍>_<",
              showMarkersMapData: false
            })
          }
        }
      }
    },
  onLoad: function () {
    var that =this;
    that.setData({
      mapDataList:MapData
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var temp = 'markers[0].latitude'
        var temp1 = 'markers[0].longitude'
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          [temp]: res.latitude,
          [temp1]:res.longitude
        })
      },
    })
    
    wx.getSystemInfo({
      success: function(res) {
        var temp = 'controls[0].position.left'
        var temp1 = 'controls[0].position.top'
        that.setData({
          mapHeight:res.windowHeight*0.7,
          [temp]:res.windowWidth-60,
          [temp1]:res.windowHeight*0.7-60,
          scrollHeight:res.windowHeight*0.3,
          fullScreenHeight:res.windowHeight
        })
      },
    })  
    
    qqmapsdk = new QQMapWX({ key:'A4DBZ-EN5WS-H5BON-6CJOL-HB6AH-4UBVB'})

   
  },

  
  regionchange: function(){
    var that = this;
    this.mapCtx = wx.createMapContext("map",this);
    this.mapCtx.getCenterLocation({
      success:function(res){
        var temp = 'markers[1].latitude'
        var temp1 = 'markers[1].longitude'
        var temp2 = 'markers[0].iconPath'
        that.setData({
          [temp]:res.latitude,
          [temp1]:res.longitude,
          [temp2]: "",
          moveMap:false
        })
      }
    })
    ans.ansLaLo.latitude = 0
    ans.ansLaLo.longitude = 0

  },
  controltap: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var temp = 'markers[0].latitude'
        var temp1 = 'markers[0].longitude'
        var temp2 = 'markers[0].iconPath'
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          [temp]: res.latitude,
          [temp1]: res.longitude,
          [temp2]: "../../icon/resources/others.png",
        })
      },
    })
    
  },

  onShow:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var temp = 'markers[0].latitude'
        var temp1 = 'markers[0].longitude'
        that.setData({
          //latitude: res.latitude,
          //longitude: res.longitude,
          [temp]: res.latitude,
          [temp1]: res.longitude,
        })
      },
    })
    wx.getSystemInfo({
      success: function (res) {
        var temp = 'controls[0].position.left'
        var temp1 = 'controls[0].position.top'
        that.setData({
          mapHeight: res.windowHeight * 0.6,
          [temp]: res.windowWidth - 60,
          [temp1]: res.windowHeight * 0.6 - 60,
          scrollHeight: res.windowHeight * 0.4,
          fullScreenHeight: res.windowHeight
        })
      },
    })
    
    if(ans.ansLaLo.latitude != 0 || ans.ansLaLo.longitude != 0){
      var temp = 'markers[1].latitude'
      var temp1 = 'markers[1].longitude'
      that.setData({
        latitude: ans.ansLaLo.latitude,
        longitude: ans.ansLaLo.longitude,
        [temp]:ans.ansLaLo.latitude,
        [temp1]: ans.ansLaLo.longitude
      })
    }

    this.updata(this);
  },

  updata: function (that) {
    that.findMapData(that);
    var timer = setTimeout(function () {
      that.updata(that);
    }
      , 500)
  },


  getUserInfo: function (e) {
  }
})
