export const formComponentValid = (validateList) => {
  validateList.forEach(({ selector, ruleList }) => {
    const messageList = document.querySelectorAll(`${selector} .valid-message-box span`)
    const formInput = document.querySelector(`${selector} input`)

    messageList.forEach((item, index) => item.innerText = ruleList[index].text )

    const eventList = ['blur', 'input']
    eventList.forEach((item, index) => {
      formInput.addEventListener(item, (e) => {
        ruleList.forEach(({ rule }, index) => {
          messageList[index].classList.toggle('text-s2-400', rule(e.target.value))
        })
        e.target.classList.toggle('error', ruleList.some(({ rule }) => !rule(e.target.value)))
      })
    })
  })
}
export const paginationOption = {
  el: '.swiper-pagination',
  clickable: true,
};
export const navigationOption = (extrabtn = '') => ({
  nextEl: `.swiper-button-next${extrabtn}`,
  prevEl: `.swiper-button-prev${extrabtn}`,
});
const slideSetting = () => ({
  loop: true,
  autoplay: {
    delay: 5000,
		disableOnInteraction: false
  }
});
function mouseFuc(value) {
  document.addEventListener('mouseenter', event => {
    const el = event.target;
    if (el && el.matches && el.matches(value)) {
      el.swiper.autoplay.stop();
      el.classList.add('swiper-paused');
      const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
      activeNavItem.style.animationPlayState="paused";
    }
  }, true);
  document.addEventListener('mouseleave', event => {
    const el = event.target;
    if (el && el.matches && el.matches(value)) {
      el.swiper.autoplay.start();
      el.classList.remove('swiper-paused');
      const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
      activeNavItem.classList.remove('swiper-pagination-bullet-active');
      setTimeout(() => {
        activeNavItem.classList.add('swiper-pagination-bullet-active');
      }, 10);
    }
  }, true);
}
//Swiper 共用輪播
export function multSwiperImage() {
  const swiperImages = new Swiper('.swiper-images', {
    pagination: paginationOption,
    navigation: navigationOption(),
    ...slideSetting(),
    slidesPerView : '1.25',  
    centeredSlides: true,
    spaceBetween : 4,
    on: {
      transitionStart: function() {
      },
      slideChangeTransitionEnd: function() {
        const { dataset } = document.querySelector('.swiper-slide-active');
        const imageText = document.querySelector('.image-text');
        imageText.innerText = dataset.text
      },
    },
  });
  mouseFuc('.swiper-images');
}
export function bannerSwiper() {
  const swiperBanner = new Swiper('.swiper-banner', {
    pagination: paginationOption,
    navigation: navigationOption(),
    ...slideSetting(),
  });
  mouseFuc('.swiper-banner');
}
