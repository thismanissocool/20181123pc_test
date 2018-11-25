/**
 * Created by Administrator on 2018/11/23.
 */
//内容区模块
export default function () {
  const navLiNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.header-main .arrow');
  const contentNode = document.querySelector('#content');
  const ulNode = document.querySelector('#content>ul');

//缓存小箭头自身宽度一半
  const arrowHalfWidth = arrowNode.offsetWidth/2;
//缓存内容区的高度
  let contentHeight = contentNode.offsetHeight;

//ie chrom
  document.onmousewheel = wheel;
//firefox
  document.addEventListener('DomMouseScall', wheel);
//li的下标
  let nowIndex = 0;
//设置定时器
  let wheelTimer = null;

//鼠标滚动事件
  function wheel(event) {
    event = event || window.event;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      let flag = '';
      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      }


      switch (flag) {
        case 'up' :
          if (nowIndex > 0){
            nowIndex -- ;
            move(nowIndex);
          }
          break;
        case 'down' :
          if (nowIndex < 4){
            nowIndex ++ ;
            move(nowIndex);
          }

          break;
      }
    }, 200)


    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
  }

//绑定鼠标滚动 ulNode 和navNodes 对应逻辑的事件
  function move(nowIndex) {
    for (let i = 0; i < navLiNodes.length; i++) {
      navLiNodes[i].className = '';
    }
    navLiNodes[nowIndex].className = 'active';
    ulNode.style.top = - nowIndex * contentHeight + 'px';
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
  }
//点击nav中li
  for (let i = 0; i < navLiNodes.length; i++) {
    navLiNodes[i].onclick = function () {
      nowIndex = i;
      move(nowIndex);
    };
  }

//初始化小箭头
  arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';
  move(4);
//绑定窗口的缩放事件
  window.onresize = function () {
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //ul修正值
    contentHeight = contentNode.offsetHeight;
    ulNode.style.top = - nowIndex * contentHeight + 'px';
  }
}