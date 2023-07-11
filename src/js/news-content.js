import { paginationOption, navigationOption } from "./common";
const swiperImages = new Swiper('.swiper-images', {
  watchOverflow: true,
  pagination: paginationOption,
  navigation: navigationOption(),
  slidesPerView : 1.25,  
  centeredSlides: true,
  spaceBetween : 4,
  autoplay: {
    delay: 5000,
		disableOnInteraction: false
  },
  loop: true,
  watchSlidesProgress:true,
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

document.addEventListener('mouseenter', event => {
	const el = event.target;
	if (el && el.matches && el.matches('.swiper-images')) {
		el.swiper.autoplay.stop();
		el.classList.add('swiper-paused');
		const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
		activeNavItem.style.animationPlayState="paused";
	}
}, true);

document.addEventListener('mouseleave', event => {
	const el = event.target;
	if (el && el.matches && el.matches('.swiper-images')) {
		el.swiper.autoplay.start();
		el.classList.remove('swiper-paused');
		const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
		activeNavItem.classList.remove('swiper-pagination-bullet-active');
		setTimeout(() => {
			activeNavItem.classList.add('swiper-pagination-bullet-active');
		}, 10);
	}
}, true);

