/**
 * Created by Administrator on 2018/11/26.
 */
export default function () {
  //获取DOM节点
  const liNodes = document.querySelectorAll('.team-list li');
  const ulNode = document.querySelector('.team-list');

  //缓存li（或画布）的宽高
  const width = liNodes[0].offsetWidth;
  const height = liNodes[0].offsetHeight;


  //定义画布的初始转态
  let canvas = null;
  let createTimer = null;
  let bubbleTimer = null;


  //鼠标移入
  for (let i = 0; i < liNodes.length; i++) {
    liNodes[i].onmouseenter = function () {
      for (let j = 0; j < liNodes.length; j++) {
        liNodes[j].style.opacity = 0.5;
      }
      this.style.opacity = 1;
      addCanvas(i);
    };
  }

  //鼠标溢出
  ulNode.onmouseleave = function () {
    for (let i = 0; i < liNodes.length; i++) {
      liNodes[i].style.opacity = 1;
    }
    canvas.remove();
    canvas = null;
  };

  //画布创建(逻辑模糊？？注意~)
  function addCanvas(index) {
    if (!canvas){
      //创建画布
      canvas = document.createElement('canvas');

      //画布设置宽高
      canvas.width = width;
      canvas.height = height;

      //画布添加样式，画布在ul中
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = index * width + 'px';
      // canvas.style.backgroundColor = '#fff';

      bubble();

      //画布添加到ul中
      ulNode.appendChild(canvas);
    } else {
      canvas.style.left = index * width + 'px'
    }

  }


  //气泡运动
  function bubble() {
    //气泡的数组
    let yuanArr = [];

    //创建小圆点相关属性
    createTimer = setInterval( () => {
      //气泡颜色随机
      const r = Math.round(Math.random() * 255);
      const g = Math.round(Math.random() * 255);
      const b = Math.round(Math.random() * 255);

      //气泡半径
      const yuan_r = Math.round(Math.random() * 8 + 2);

      //气泡的位置随机
      const x = Math.round(Math.random() * width);
      const y = height + yuan_r;

      //初始化弧度
      const rad = 0;

      //缩放系数
      const s = Math.round(Math.random() * 50 + 20);

      yuanArr.push({
        r,
        g,
        b,
        x,
        y,
        yuan_r,
        rad,
        s
      })
    }, 40);

    //画圆
    // bubbleTimer = setInterval( () => {
    //   if (canvas.getContext){
    //     //定义画笔
    //     const ctx = canvas.getContext('2d');
    //     //清除上一次画布
    //     ctx.clearRect(0, 0, width, height);
    //     //开始画圆
    //     yuanArr.forEach(item => {
    //       //每一次弧度递增
    //       item.rad += 0.1;
    //       //item.s决定摆动幅度
    //       const x = Math.round(item.x + Math.sin(item.rad) * item.s);
    //       const y = Math.round(item.y - item.rad * item.s);
    //
    //       //设置颜色
    //       ctx.fillStyle = `rgb(${item.r}, ${item.g}, ${item.b})`;
    //
    //       ctx.beginPath();
    //
    //       ctx.arc(x, y, item.circle_r, 0, 2 * Math.PI);
    //
    //       ctx.fill();
    //     })
    //   }
    // }, 1000 / 60);
  }


}