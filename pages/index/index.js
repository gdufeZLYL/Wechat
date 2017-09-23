//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    item:23,
    buttonArray:[{
      name:"button_1",
      id:"button_1",
      text:"开始测试",
      type:"primary",
      even:"start",
    },{
       name:"button_2",
      id:"button_2",
      text:"设置难度",
      type:"default",
      even:"changeNumberSize",
    },{
       name:"button_3",
      id:"button_3",
      text:"设置时间",
      type:"default",
      even:"changeTimeSize",
    }]
  },
 
  //设置难度
  changeNumberSize:function(e){
    wx.showActionSheet({
  itemList: ['10以内加减法', '20以内加减法', '100以内加减法'],
  success: function(res) {
    if(res.tapIndex==0){app.numberSize=10}
    if(res.tapIndex==1){app.numberSize=20};
    if(res.tapIndex==2){app.numberSize=100};
    if(res.cancel!=true){
    wx.showToast({
  title: '设置游戏难度成功',
  icon: 'success',
  duration: 2000
})}
  },
  fail: function(res) {
    console.log(res.errMsg)
  }
})
  },
    //设置时间
  changeTimeSize:function(e){
    wx.showActionSheet({
  itemList: ['1分钟', '2分钟', '5分钟','10分钟'],
  success: function(res) {
    if(res.tapIndex==0){app.timeSize=1}
    if(res.tapIndex==1){app.timeSize=2};
    if(res.tapIndex==2){app.timeSize=5};
    if(res.tapIndex==3){app.timeSize=10};
    if(res.cancel!=true){
     wx.showToast({
  title: '设置游戏时间成功',
  icon: 'success',
  duration: 2000
})}
  },
  fail: function(res) {
    console.log(res.errMsg)
  }
})
  },
  //跳转到游戏界面
  start:function(e){
    wx.navigateTo({
      url: '../newTest/newTest'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
