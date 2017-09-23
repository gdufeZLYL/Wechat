var app=getApp();
Page({
    data:{
        rightAmount:0,
        wrongAmount:0,
        firstNumber:0,
        secondNumber:0,
        answer:0,
        isPlus:true,
        answerArray:[1,2,3,4],
        numberSize:10,
        grade:0,
        progress:0,
        shaking:{},//摇动动画
    },
    textShake:function(is){
        var animation = wx.createAnimation({  
    duration: 50,  
  })  ;
  if(is){
      //染绿色
    animation.backgroundColor("rgb(112,174,74)");
  }else{
      //染红色，并动起来
    animation.backgroundColor("rgb(255,145,190)");
    animation.translateX(10).step();
    animation.translateX(-10).step();
  }
  
  animation.translateX(0).step();
      
  this.setData({
      shaking:animation.export()
    })
    },


      //随机生成并改变一组指定范围内的加减法组合
    initNumber:function(){
        var numberSize=this.data.numberSize;
        var result=Math.round(Math.random()*numberSize);
        var firstNumber=Math.round(Math.random()*numberSize);
        var secondNumber=result-firstNumber;

        //开始随机生成成4个答案
        
        var answerArray=new Array;
        //随机生成正确答案位置
        var count=Math.ceil(Math.random()*4);
        for(;answerArray.length<4;){
            var answer=Math.round(Math.random()*numberSize);
            if(count==(answerArray.length+1)){answerArray.push(result);}
            if(answer!=result&&answerArray.indexOf(answer)==-1&&answerArray.length<4){answerArray.push(answer);}
        }//生成成功
        //如果第二个数小于0，取绝对值并把isPlus设为false
        var isPlus=true;
    if(secondNumber<0){
        secondNumber=-secondNumber;
        isPlus=false;
    }
        //更新数据
        this.setData({
                    isPlus:isPlus,
                    answer:result,
                    firstNumber:firstNumber,
                    secondNumber:secondNumber,
                    answerArray:answerArray});
    },
    judgeNumber:function(e){
        console.log(this.data.answer);
         console.log(e.target.id);
         if(e.target.id==this.data.answer){
            console.log("答题正确");


            this.setData({rightAmount:this.data.rightAmount+1,
            grade:this.data.grade+1,}
            );this.textShake(true);
        }else{console.log("答题错误");
            
        
 
        
        this.setData({wrongAmount:this.data.wrongAmount+1,
        grade:this.data.grade-3,});
        this.textShake(false);}
        this.initNumber();
        
    },
    runProgress:function(that){
        var progress=that.data.progress;
        if(progress==1000){
            wx.redirectTo({
  url: '../end/end?grade='+this.data.grade+'&rightAmount='+this.data.rightAmount+'&wrongAmount='+this.data.wrongAmount
})
    
        }else{
              setTimeout(function(){
                  // 判断当前页面是否已经退出
                    if(getCurrentPages().length==2){
                  that.setData({progress:progress+1});
                  that.runProgress(that);}
              },60*app.timeSize)
        }
    },
    onReady:function(e){
        //进度条跑起来
        this.runProgress(this);
   
    },
     onLoad:function(options){
          this.setData({    
      numberSize: app.numberSize})   
        this.initNumber();
    },
});