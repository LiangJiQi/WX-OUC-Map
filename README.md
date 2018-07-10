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
'''
if (that.data.markers[1].latitude <= that.data.mapDataList.MapDataList[i].latitude1 && that.data.markers[1].latitude >= that.data.mapDataList.MapDataList[i].latitude2 && that.data.mapDataList.MapDataList[i].longitude1 >= that.data.markers[1].longitude && that.data.mapDataList.MapDataList[i].longitude2 <= that.data.markers[1].longitude)

'''
