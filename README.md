# OUC Map    OUC地图
## 微信小程序项目介绍

* 这是我在移动软件开发课程上设计的微信小程序项目

  > 感谢陈，张，孟，马，寇小组成员提供地图测绘数据。
  
* 平台环境

  > 微信微信小程序开发语言wxml wxcs js    微信小程序开发工具。

* 主要功能

  > 提供对中国海洋大学校内地点的搜索和地图浏览介绍。
  
* 目前已上线
  
  >可微信搜索“OUC地图”小程序
  
  ![微信小程序二维码](http://m.qpic.cn/psb?/V10as9kA4VqXhE/*MI1UEmSDVsx2jnwlAHriqy3Jqk5UIQ3CrcA4JLO8Mk!/b/dCEBAAAAAAAA&bo=WAGIAQAAAAARB.A!&rf=viewer_4)
  
## 主要文件介绍

* 三个页面

* map页面
    * 主要文件在map文件夹，主要功能是上半部显示地图，下半部显示黑白标记当前位置和彩色标记位置所在地点的介绍
    
* search页面
    * 主要文件在navigation文件夹，主要功能是提供搜索框和搜索按钮，用户可用此对校内地点进行搜索，搜索结果列表显示在按钮下方
    
* help页面
    * 主要文件在help文件夹，主要功能是对小程序的功能进行一些说明，还提供了联系我们按钮，只能通过search页面右上方Help页面链接进入
    
## 必要代码说明

* 1
  * map.js文件中将地图组件的两个markers标记一个设为当前位置，另一个设为地图中心点位置，用计时函数不断检测两个标记的位置经纬度是否在校内某个地点范围内

```
//当前位置赋予黑白markers标记点
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
//地图中心点赋予彩色markers标记点
this.mapCtx.getCenterLocation({
      success:function(res){
        var temp = 'markers[1].latitude'
        var temp1 = 'markers[1].longitude'
        var temp2 = 'markers[0].iconPath'
        that.setData({
          [temp]:res.latitude,
          [temp1]:res.longitude,
          [temp2]: "",
        })
      }
    })
//检测是否为某点范围内
if (that.data.markers[1].latitude <= that.data.mapDataList.MapDataList[i].latitude1 && that.data.markers[1].latitude >= that.data.mapDataList.MapDataList[i].latitude2 && that.data.mapDataList.MapDataList[i].longitude1 >= that.data.markers[1].longitude && that.data.mapDataList.MapDataList[i].longitude2 <= that.data.markers[1].longitude) {
          var temp = 'showPointData[1]'
          //如果是校内某点坐标则显示介绍
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

```

* 2
  * navigation.js文件中将用户在输入框输入的文字获取，与所有校内地点名字关键字匹配，并显示搜索结果列表
  
```
  if(this.data.searchMapData == ""){
      wx.showModal({
        title: '提示',
        content: '搜索内容为空！',
      })
   }
   else {
     var j = 0
     //循环对比
     for (var i = 0;i < this.data.MapDataList.MapDataList.length;i++){
       if(this.data.MapDataList.MapDataList[i].name.indexOf(this.data.searchMapData) >= 0){
         var temp1 = "searchAns["+j+"].name"
         var temp2 = "searchAns["+j+"].info"
         var temp3 = "searchAns["+j+"].index"
         //显示某个搜索结果
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
   
```
* 3
  * help.js文件在用户点击联系我们按钮并确定后复制微信号至剪切板
```
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
```
  
* 4
  * mapData.js文件为海大校内各个地点范围经纬度**（目前数据还期待完善）**
```
 {
    id: 2100,
    latitude1: 36.158858,
    latitude2: 36.157809,
    longitude1: 120.497886,
    longitude2: 120.496840,
    latitude3: 36.158333,
    longitude3: 120.497363,
    name: '崂山校区图书馆',
    info: "中国海洋大学图书馆分设于鱼山校区和崂山校区，建筑面积约5.2万平方米，阅览座位4000余个，其中电子阅览室座位260余个。文献资源建设实行专家圈选、读者推荐、馆员建构三位一体的机制，集专家、读者和馆员的智慧，使文献资源更贴近于教学科研，更贴近于读者，更具有实效性。至2017年底，馆藏纸质图书报刊文献约250万册、中外文电子书刊500余万册、数据库303个。馆藏文献资源在保持连续性和覆盖面的基础上，努力满足重点学科和优势研究领域的需求，馆藏文献特色日益凸显。2004年以来，图书馆以中国海洋大学突出的海洋、水产学科传统馆藏文献资源为基础，建设了实体海洋文库，至目前，纸本馆藏图书6万余册，面向读者开放。"
  },
```

## 地图位置
    `注意`
**`地图数据可能涉及隐私等相关问题，切勿他用！`**
