var app=getApp();
Page({
    data:{
        grade:0,
        text:"",
        rightAmount:0,
        wrongAmount:0,
    },
    comeBack:function(){
       wx.navigateBack({
  delta: 1
})
    
    },
    //画星星
    drawStar:function(index){
        var r=50,x=50,y=100;
        console.log("drawStar start");
  var cxt_arc = wx.createCanvasContext('Star');//创建并返回绘图上下文context对象。 
  cxt_arc.setLineWidth(3); 
  cxt_arc.setFillStyle('green');
  cxt_arc.setStrokeStyle('red'); 
  cxt_arc.setLineCap('round') 
  cxt_arc.beginPath();//开始一个新的路径 
    if(index==1){var r=50,x=150,y=50,space=0};
    if(index==2){var r=50,x=75,y=50,space=150};
    if(index==3){var r=50,x=50,y=50,space=100};
  for(var j=1;j<=index;x=x+space,j++){
      console.log("r="+r+",x="+x+",y="+y+",space="+space);
  var dit = Math.PI * 4 / 5;
      var sin = Math.sin(2*Math.PI/360*342) * r + y;
      var cos = Math.cos(2*Math.PI/360*342) * r + x;
      console.log(0+":"+0);
      cxt_arc.moveTo(cos, sin);
      for (var i = 0; i < 5; i++) {
        var tempDit = dit * i;
        sin = Math.sin(tempDit+2*Math.PI/360*342) * r + y;
        cos = Math.cos(tempDit+2*Math.PI/360*342) * r + x;
        cxt_arc.lineTo(cos, sin);
        console.log(sin+":"+sin+":"+tempDit);
      }

  }

      cxt_arc.closePath();
      cxt_arc.fill();
 
  cxt_arc.draw(); 
             console.log("drawCxt end");
    },
    continute:function(){
      wx.redirectTo({
  url: '../newTest/newTest'
})
    },
    playMusic:function(index){
        var url="";
        if(index==1){url='http://oss-cn-qingdao.aliyuncs.com/iflytts/ios/share/2017/04/10/067D467C-919A-4700-B209-06BEE772FAC9.mp3'}
    
     if(index==2){url='http://oss-cn-qingdao.aliyuncs.com/iflytts/ios/share/2017/04/10/65FC5069-ABC2-474B-8B9C-B46912259281.mp3'}
    
     if(index==3){url='http://oss-cn-qingdao.aliyuncs.com/iflytts/ios/share/2017/04/10/81607602-5BDC-40C9-BB1C-2B37F46563B6.mp3'}


      wx.playBackgroundAudio({
    dataUrl: url,
    success: function(e){
        console.log("play  sucesss");
    },
    coverImgUrl: ''
})
    },
  
    onLoad:function(options){
     
     
        var text="";
        if(options.grade<20){this.drawStar(1);text="加油！加油！争取下次做得更好", this.playMusic(1)}
        if(40>options.grade&&options.grade>=20){this.drawStar(2);text="做得很好，但还要继续努力!", this.playMusic(2)}
        if(options.grade>=40){this.drawStar(3);text="非常棒！请继续保持!", this.playMusic(3)}
          this.setData({    
      grade: options.grade,
      wrongAmount:options.wrongAmount,
      rightAmount:options.rightAmount,
      text:text}) 
    },
    

});