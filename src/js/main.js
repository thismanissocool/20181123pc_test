/**
 * Created by Administrator on 2018/11/23.
 */
import firstView from './firstView';
//内容区模块
export default function () {
  const navLiNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.header-main .arrow');
  const contentNode = document.querySelector('#content');
  const ulNode = document.querySelector('#content>ul');
  const menuLiNodes = document.querySelectorAll('.menu-point li');
  const lineNode = document.querySelector('#boot-animation .line');
  const upNode = document.querySelector('#boot-animation .up');
  const downNode = document.querySelector('#boot-animation .down');
  const bootAnimationNode = document.querySelector('#boot-animation');


  const homeCarouselNode = document.querySelector('.home-carousel');
  const homePointNode = document.querySelector('.home-point');
  const plane1Node = document.querySelector('.course .course-plane1');
  const plane2Node = document.querySelector('.course .course-plane2');
  const plane3Node = document.querySelector('.course .course-plane3');
  const pencel1Node = document.querySelector('.works .works-pencel1');
  const pencel2Node = document.querySelector('.works .works-pencel2');
  const pencel3Node = document.querySelector('.works .works-pencel3');
  const aboutListNodes = document.querySelectorAll('.about .about-list');
  const teamTitleNode = document.querySelector('.team-title');
  const teamTextNode = document.querySelector('.team-text');

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
  let lastIndex = 0;

//设置定时器
  let wheelTimer = null;

  //开机动画
  //获取所有图片
  const imgsArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
  //图片加载完成数量
  let imgsLoaded = 0;
  //图片的数量
  let length = imgsArr.length;

  //遍历图片名，为每一个图片添加src属性。加载图片
  imgsArr.forEach( (item, index) => {
    //创建img标签
    const img = new Image();
    //缓存图片,防止图片马上加载完成
    img.onload = function(){
      imgsLoaded ++;
      //改变line的宽度
      lineNode.style.width = imgsLoaded/length * 100 + '%';
      if (imgsLoaded === length){
        upNode.style.height = '0';
        downNode.style.height = '0';
        lineNode.style.display = 'none';
        //移除遮罩层
        upNode.addEventListener('transitionend',function () {
          bootAnimationNode.remove();
          //第一屏入场动画
          animation[0].anIn();
          //第一屏轮播开始
          firstView();
        });

      }

    };
    //添加src属性
    img.src = `./images/${item}`;
  });

  //出入场动画
  const animation =[
    {
      anIn(){
        homeCarouselNode.style.transform = 'translateY(0)';
        homeCarouselNode.style.opacity = 1;
        // homePointNode.style.transform = 'translateY(0)';
      },
      anOut(){
        homeCarouselNode.style.transform ='translateY(-50px)';
        homeCarouselNode.style.opacity = 0;
        // homePointNode.style.transform = 'translateY(50px)';
      }
    },
    {
      anIn(){
        plane1Node.style.transform = 'translate(0, 0)';
        plane2Node.style.transform = 'translate(0, 0)';
        plane3Node.style.transform = 'translate(0, 0)';
      },
      anOut(){
        plane1Node.style.transform = 'translate(-100px, -100px)';
        plane2Node.style.transform = 'translate(-100px, 100px)';
        plane3Node.style.transform = 'translate(100px, -100px)';
      }
    },
    {
      anIn(){
        pencel1Node.style.transform = 'translateY(0)';
        pencel2Node.style.transform = 'translateY(0)';
        pencel3Node.style.transform = 'translateY(0)';
      },
      anOut(){
        pencel1Node.style.transform = 'translateY(-100px)';
        pencel2Node.style.transform = 'translateY(100px)';
        pencel3Node.style.transform = 'translateY(100px)';
      }
    },
    {
      anIn(){
        aboutListNodes[0].style.transform = 'rotate(0)';
        aboutListNodes[1].style.transform = 'rotate(0)';
      },
      anOut(){
        aboutListNodes[0].style.transform = 'rotate(45deg)';
        aboutListNodes[1].style.transform = 'rotate(-45deg)';
      }
    },
    {
      anIn(){
        teamTitleNode.style.transform = 'translateX(0)';
        teamTextNode.style.transform = 'translateX(0)';
      },
      anOut(){
        teamTitleNode.style.transform = 'translateX(-200px)';
        teamTextNode.style.transform = 'translateX(200px)';
      }
    }
  ];
  //测试
  // animation[3].anIn();
  // setTimeout(() => {
  //   animation[4].anIn();
  //   // animation[3].anOut();
  // },5000);
  // animation[4].anOut();

  //所有添加出场动画
  for (let i = 0; i < animation.length; i++) {
    animation[i].anOut();
  }

  //默认第一屏入场
  // setTimeout(() => {
  //     animation[0].anIn();
  //     // animation[3].anOut();
  //   },2000);


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
    }, 200);


    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
  }

//绑定鼠标滚动 ulNode 和navNodes 对应逻辑的事件
  function move(nowIndex) {
    // for (let i = 0; i < navLiNodes.length; i++) {
    //   navLiNodes[i].className = '';
    //   menuLiNodes[i].className = '';
    // }
    navLiNodes[lastIndex].className = '';
    menuLiNodes[lastIndex].className = '';
    navLiNodes[nowIndex].className = 'active';
    ulNode.style.top = - nowIndex * contentHeight + 'px';
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    menuLiNodes[nowIndex].className = 'active';
    //让上一屏做出场动画
    animation[lastIndex].anOut();
    //让当前屏做入场动画
    animation[nowIndex].anIn();
    lastIndex = nowIndex;
  }

//点击nav中li
  for (let i = 0; i < navLiNodes.length; i++) {
    navLiNodes[i].onclick = function () {
      nowIndex = i;
      move(nowIndex);
    };
    //点击右侧导航栏
    menuLiNodes[i].onclick = function () {
      nowIndex = i;
      move(nowIndex);
    };
  }

//初始化小箭头
  arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

  // move(4);
//绑定窗口的缩放事件
  window.onresize = function () {
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //ul修正值
    contentHeight = contentNode.offsetHeight;
    ulNode.style.top = - nowIndex * contentHeight + 'px';
  };

}