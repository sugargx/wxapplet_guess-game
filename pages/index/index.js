//index.js
//获取应用实例
//定义常量,普通变量定义为let
const app = getApp()
//定时器
let timer = null;
Page({
  data: {
    // 获胜次数
   wintimes:0,
  //  比赛结果
   resinfo: "结果",
   //左边机器人的出拳图片
   robotImg:"../../images/robot.png",
   //开始按钮是否可点击
   tapable:"",
   //我选择的出拳图片
   myImg:"../../images/user.png",

   //用户出拳的结果
   userResult:null,
   //机器人出拳的结果
   robotResult:null,
  },

  //开始按钮的函数
  start: function(){
    var that = this;
    //间断
    //timer = setInterval({函数}，时间间隔);
    timer = setInterval(function(){
        //每隔50ms执行一次图片切换
      let index = Math.floor(Math.random() * 3);
      that.setData({
        robotImg: '../../images/' + index + '.png'
      })

      //判断用户是否已经出拳
      if(that.data.userResult){

        //停止定时器，不再切换
        clearInterval(timer);

        //记录robot出拳的结果
        that.setData({
          robotResult:index
        })

      //调用判断函数进行结果的判断
      that.judge();
      }
    }, 50);

    that.setData({
      tapable:"disable",
      myImg: '../../images/user.png'
    })
  },

  //三个图片选择函数
  select:function(e){
    var that = this;
    //打印此时点的图片的id
    console.log(e.target.id, '用户所选拳id');

    that.setData({
      myImg:'../../images/' + e.target.id + '.png',
      userResult: e.target.id
    })

  },
  
  //判断结果函数
  judge:function(){
    var that = this;
    // console.log(that.data.robotResult,'机器人');
    // console.log(that.data.userResult,'用户');
    let finalres = that.data.robotResult + that.data.userResult;
    console.log(finalres,'比赛各方所出拳id');

    switch(finalres){
      //平局
      case '00':
      case '11':
      case '22':{
        that.setData({
          resinfo:"平局"
        });
        break;
      }
      case '01':
      case '12':
      case '20':{
        that.setData({
          resinfo:"输了"
        });
        break;
      }
      case '10':
      case '21':
      case '02':{
        that.setData({
          resinfo:"赢了",
          //that.data.wintimes代表取出来
          wintimes: that.data.wintimes+1
        });
        break;
      }
    }

    //恢复按钮的点击，同时将出拳的结果清理
    that.setData({
      tapable:"",
      robotResult: null,
      userResult: null
    })
  },

  //页面加载函数
  onLoad: function () {
      console.log('onload方法被执行了！！');
  },
})
