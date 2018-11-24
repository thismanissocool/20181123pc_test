/**
 * Created by Administrator on 2018/11/24.
 */


export default function () {
  //获取元素
  const pointNodes = document.querySelectorAll('.home .home-point li');
  const liNodes = document.querySelectorAll('.home-carousel li');
  const homeNode = document.querySelector('.home');


  //缓存变量
  let nowIndex  = 0;
  let lastIndex = 0;
  let timer = null;
  let lastTime = 0;


  //绑定事件

  //小圆点de点击事件
  for (let i = 0; i < pointNodes.length; i++) {
    pointNodes[i].onclick = function () {
      for (let j = 0; j < pointNodes.length; j++) {
        pointNodes[j].className = '';
      }
      this.className = 'active';
    }
  }

  //轮播图轮播效果
  for (let i = 0; i < pointNodes.length; i++) {
    pointNodes[i].onclick = function () {
      //行数节流（在规定之内点击无效）
      const nowTime = Date.now();
      if (nowTime - lastTime < 2500) return;
      nowIndex = i;
      //点击小圆点  不进行处理
      if (nowIndex === lastIndex) return;
      if (nowIndex > lastIndex) {
        liNodes[nowIndex].className = 'common-title rightShow';
        liNodes[lastIndex].className = 'common-title leftHide';
      } else {
        liNodes[nowIndex].className = 'common-title leftShow';
        liNodes[lastIndex].className = 'common-title rightHide';
      }

      //小圆点轮播
      pointNodes[lastIndex].className = '';
      pointNodes[nowIndex].className = 'active';

      lastIndex = nowIndex;
      lastTime = nowTime;

    }


  }

  //轮播效果
  function autoPlay () {
    timer = setInterval(() => {
      nowIndex ++ ;

      if (nowIndex === 4) {
        nowIndex = 0;
      }

      //轮播状态  只有向右变换 所以只需要有rightShow    leftHide动画
      liNodes[nowIndex].className = 'common-title rightShow';
      liNodes[lastIndex].className = 'common-title leftHide';

      //小圆点轮播
      pointNodes[lastIndex].className = '';
      pointNodes[nowIndex].className = 'active';



      lastIndex = nowIndex;
    }, 3000)
  }

  autoPlay();

  //鼠标悬浮  轮播停止
  homeNode.onmouseenter = function () {
    //清除轮播
    clearInterval(timer);
  }
  homeNode.onmouseleave = autoPlay;

}