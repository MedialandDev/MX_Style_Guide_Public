export const paginationOption = {
  el: '.swiper-pagination',
  clickable: true,
};
export const navigationOption = (extrabtn = '') => ({
  nextEl: `.swiper-button-next${extrabtn}`,
  prevEl: `.swiper-button-prev${extrabtn}`,
});
const swiperBanner = new Swiper('.swiper-banner', {
  watchOverflow: true,
  pagination: paginationOption,
  navigation: navigationOption(),
  autoplay: {
    delay: 3500,
		disableOnInteraction: false
  },
  loop: true,
  watchSlidesProgress:true,
  on: {
    transitionStart: function() {
    },
    slideChangeTransitionEnd: function() {
    },
  },
});
document.addEventListener('mouseenter', event => {
	const el = event.target;
	if (el && el.matches && el.matches('.swiper-banner')) {
		el.swiper.autoplay.stop();
		el.classList.add('swiper-paused');
		const activeNavItem = document.querySelector('.swiper-pagination-bullet-active');
		activeNavItem.style.animationPlayState="paused";
    console.log('Stooooppp',activeNavItem)
	}
}, true);

document.addEventListener('mouseleave', event => {
	const el = event.target;
	if (el && el.matches && el.matches('.swiper-banner')) {
		el.swiper.autoplay.start();
		el.classList.remove('swiper-paused');
		const activeNavItem = document.querySelector('.swiper-pagination-bullet-active');
		
		activeNavItem.classList.remove('swiper-pagination-bullet-active');
		// activeNavItem.style.animation = 'none';

		setTimeout(() => {
			activeNavItem.classList.add('swiper-pagination-bullet-active');
			// activeNavItem.style.animation = '';
		}, 10);
	}
}, true);