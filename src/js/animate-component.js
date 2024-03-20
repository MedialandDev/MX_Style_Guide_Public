import '../css/animate.styl';
import '../css/button.styl';

gsap.registerPlugin(ScrollTrigger);
// 放大功能-function START
function scaleUp(ele) {
  let delay = ele.dataset.delay ? ele.dataset.delay : '0'; // 設定是否延遲動畫
  gsap.fromTo(ele, { scale: 0 }, {
    duration: 1.2,
    scale: 1,
    delay: delay,
    ease: 'expo',
  });
}
// 放大功能-function END
// 淡入Fade-functionn START
function fadeFrom(ele, direction) {
  direction = direction || 1;
  let x = 0;
  let y = 0;
  const delay = ele.dataset.delay ? ele.dataset.delay : '0'; // 設定是否延遲動畫
  // 從左進入
  if (ele.classList.contains('fade-left')) {
    x = -100;
  }
  // 從右進入
  if (ele.classList.contains('fade-right')) {
    x = 100;
  }
  // 從下進入
  if (ele.classList.contains('fade-up')) {
    y = direction * 50;
  }
  ele.style.transform = `translate(${x}px, ${y}px)`;
  ele.style.opacity = '0';
  gsap.fromTo(ele, { x, y, autoAlpha: 0 }, {
    duration: 1.2,
    x: 0,
    y: 0,
    delay,
    autoAlpha: 1,
    ease: 'expo',
    overwrite: 'auto',
  });
}
function fadeHide(ele) {
  gsap.set(ele, { autoAlpha: 0 });
}
// 淡入Fade-function END

// 引入要用的動態
document.addEventListener('DOMContentLoaded', () => {
  // 1. 淡入效果
  gsap.utils.toArray('.fade').forEach((ele) => {
    fadeHide(ele);
    ScrollTrigger.create({
      trigger: ele.dataset.trigger ? ele.dataset.trigger : ele,
      // markers: true,
      once: false, // 是否只執行一次
      onEnter: fadeFrom(ele),
      // onEnterBack: fadeFrom(ele, -1),
      // onLeave: fadeHide(ele),
      // onLeaveBack: fadeHide(ele),
      start: ele.dataset.trigger && '80% bottom',
      end: ele.dataset.trigger && 'top center',
    });
  });
  // 2. 放大效果
  gsap.utils.toArray('.scale-up').forEach((ele) => {
    ScrollTrigger.create({
      trigger: ele.dataset.trigger ? ele.dataset.trigger : ele,
      once: true,
      onEnter: scaleUp(ele),
      start: ele.dataset.trigger && '80% bottom',
      end: ele.dataset.trigger && 'top center',
    });
  });
  // 放大引入.scale-up END
});

// 3. 跑馬燈效果
const marqueeList = document.querySelectorAll('.marquee') || [];
if (marqueeList) {
  marqueeList.forEach((item) => {
    item.querySelectorAll('.animate-marquee').forEach((ele) => {
      ele.style.animationDuration = item.dataset.speed || '5s';
    });
  });
}

// 4. 鼠標放大
const btnCotsor = document.querySelectorAll('.btn-cursor') || [];
btnCotsor.forEach((ele) => {
  ele.addEventListener('mouseenter', (e) => {
    const relX = e.pageX - ele.offsetLeft;
    const relY = e.pageY - ele.offsetTop;
    ele.querySelector('.btn-circle').style.left = `${relX}px`;
    ele.querySelector('.btn-circle').style.top = `${relY}px`;
  });
});
